import { fetchEnvs } from '@/services/env/api';
import { fetchIngresses } from '@/services/ingress/api';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import '@umijs/max';
import { useRequest } from '@umijs/max';
import { Popover, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import IngressYamlViewer from './components/IngressYamlViewer';
import WhiteListPanel from './components/WhiteListPanel';

const columns: ProColumns<API.Ingress>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '命名空间',
    dataIndex: 'namespace',
    initialValue: 'low-code',
  },
  {
    title: 'ingress 类',
    search: false,
    dataIndex: 'ingressClass',
  },
  {
    title: 'ingress 名称',
    dataIndex: 'ingressName',
    copyable: true,
    search: false,
  },
  {
    title: '域名',
    dataIndex: 'domain',
    render: (_, record: API.Ingress) => {
      let hosts = Object.keys(record.rules);
      return (
        <div>
          {hosts.map((host, index) => {
            let rule = () => {
              return (
                <div>
                  {record.rules[host].map((rule, i) => {
                    return <p key={i}>{rule}</p>;
                  })}
                </div>
              );
            };
            return (
              <Popover key={index} content={rule}>
                <p>
                  {host.includes('*') ? (
                    host
                  ) : (
                    <a href={'http://' + host} target="_blank" rel="noreferrer">
                      {host}
                    </a>
                  )}
                </p>
              </Popover>
            );
          })}
        </div>
      );
    },
  },
  {
    title: '操作',
    search: false,
    valueType: 'option',
    render: (_, record, index) => {
      return [
        <IngressYamlViewer
          key={index}
          envId={1}
          namespace={record.namespace}
          name={record.ingressName}
        />,
        <WhiteListPanel
          key={index}
          envId={1}
          namespace={record.namespace}
          name={record.ingressName}
        />,
        <TableDropdown
          key="actionGroup"
          menus={[{ key: 'editAnnotations', name: '配置Annotations' }]}
          onSelect={(key) => {
            switch (key) {
              case 'editAnnotations':
                console.log('edit annotations');
                break;
              default:
                break;
            }
          }}
        />,
      ];
    },
  },
];

const IngressList: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [envId, setEnvId] = useState<number>(0);
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setEnvId(data[0].id);
    }
  }, [data]);
  return (
    <PageContainer>
      {Array.isArray(data) && (
        <>
          <Tabs
            type="card"
            onChange={(key) => {
              setEnvId(Number(key));
            }}
            items={data.map((item: API.Env) => ({ key: item.id.toString(), label: item.name }))}
          />
          <ProTable columns={columns} params={{ envId: envId }} request={fetchIngresses} />
        </>
      )}
    </PageContainer>
  );
};

export default IngressList;