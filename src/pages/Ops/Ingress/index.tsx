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
import { Input, Popover, Select, Tabs, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import IngressYamlViewer from './components/IngressYamlViewer';
import WhiteListPanel from './components/WhiteListPanel';

const prodIndentifier = 'prod';

const listNamespaces = async (params: { envId: number; envName: string }) => {
  // 涉及 prod 的，直接跳过请求。因为 namespace 数量会非常庞大，比如外部 saas 就有 2w 个
  if (params.envName.includes(prodIndentifier)) {
    return [];
  }
  let resp = await fetchNamespaces({ ...params });
  let data = resp.data;
  // 返回为一个 options 列表供 select 组件使用
  return data.map((item: string) => {
    return { label: item, value: item };
  });
};

const IngressList: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [messageApi, msgContextHolder] = message.useMessage();
  const [envId, setEnvId] = useState<number>(0);
  const [envName, setEnvName] = useState<string>('');
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
      params: { envId: envId, envName: envName },
      request: listNamespaces,
      renderFormItem: (item, config, form) => {
        if (envName.includes(prodIndentifier)) {
          return <Input placeholder="请手动输入 namespace" allowClear />;
        }
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
      render: (_, record) => {
        return [
          <WhiteListPanel
            key={0}
            envId={record.envId}
            envName={envName}
            namespace={record.namespace}
            name={record.ingressName}
          />,
          <IngressYamlViewer
            key={1}
            envId={record.envId}
            namespace={record.namespace}
            name={record.ingressName}
          />,
          <TableDropdown
            key={2}
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
      setEnvName(data[0].name);
    }
  }, [data]);

  return (
    <PageContainer>
      {msgContextHolder}
      {data && envId > 0 && (
        <>
          <Tabs
            type="card"
            onChange={(key) => {
              setEnvId(Number(key));
              let result = data.find((item) => item.id === Number(key));
              if (result) {
                setEnvName(result.name);
                if (result.name.includes(prodIndentifier)) {
                  messageApi.warning('当前为生产环境，请谨慎操作！');
                }
              }
            }}
            items={data.map((item) => ({
              icon: item.name.includes('prod') ? <WarningOutlined /> : null,
              key: item.id.toString(),
              label: item.description,
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
