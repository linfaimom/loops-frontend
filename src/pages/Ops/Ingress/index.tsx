import { fetchEnvs } from '@/services/env/api';
import { fetchIngresses } from '@/services/ingress/api';
import { fetchNamespaces } from '@/services/namespace/api';
import { WarningOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import '@umijs/max';
import { useRequest } from '@umijs/max';
import { Popover, Select, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import IngressYamlViewer from './components/IngressYamlViewer';
import WhiteListPanel from './components/WhiteListPanel';

const listNamespaces = async (params: { envId: number }) => {
  let resp = await fetchNamespaces({ ...params });
  let data = resp.data;
  // 返回为一个 options 列表供 select 组件使用
  return data.map((item: string) => {
    return { label: item, value: item };
  });
};

const IngressList: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [envId, setEnvId] = useState<number>(0);
  const formRef = useRef<ProFormInstance>();
  const columns: ProColumns<API.Ingress>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '命名空间',
      dataIndex: 'namespace',
      initialValue: 'low-code',
      params: { envId: envId },
      request: listNamespaces,
      renderFormItem: (item, config, form) => {
        const rest = {
          value: form.getFieldValue(`${item.dataIndex}`),
          onChange: (value: any) => {
            const newValues = {};
            //@ts-ignore
            newValues[`${item.dataIndex}`] = value;
            form.setFieldsValue(newValues);
            if (value !== undefined) {
              // 触发提交以用新 namespace 值来搜寻
              formRef?.current?.submit();
            }
          },
        };
        //@ts-ignore options 是透过 remote request 取回来了的
        return <Select showSearch allowClear options={config.options} {...rest} />;
      },
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
              let rules = () => {
                return (
                  <div>
                    {record.rules[host].map((rule, i) => {
                      return <p key={i}>{rule}</p>;
                    })}
                  </div>
                );
              };
              return (
                <Popover key={index} content={rules}>
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
          <WhiteListPanel
            key={index}
            envId={record.envId}
            namespace={record.namespace}
            name={record.ingressName}
          />,
          <IngressYamlViewer
            key={index}
            envId={record.envId}
            namespace={record.namespace}
            name={record.ingressName}
          />,
          <TableDropdown
            key="actionGroup"
            menus={[{ key: 'editAnnotations', name: '配置 Annotations' }]}
            onSelect={(key: string) => {
              switch (key) {
                case 'editAnnotations':
                  alert('edit annotations');
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
  useEffect(() => {
    if (data && data.length > 0) {
      setEnvId(data[0].id);
    }
  }, [data]);

  return (
    <PageContainer>
      {data && envId > 0 && (
        <>
          <Tabs
            type="card"
            onChange={(key) => {
              setEnvId(Number(key));
            }}
            items={data.map((item) => ({
              icon: item.name.includes('prod') ? <WarningOutlined /> : null,
              key: item.id.toString(),
              label: item.name,
              children: <p>{item.description}</p>,
            }))}
          />
          <ProTable
            formRef={formRef}
            columns={columns}
            params={{ envId: envId }}
            request={fetchIngresses}
          />
        </>
      )}
    </PageContainer>
  );
};

export default IngressList;
