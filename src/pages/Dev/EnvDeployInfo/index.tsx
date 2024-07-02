import { fetchDeploymentBasicInfos } from '@/services/deployment/api';
import { fetchEnvs } from '@/services/env/api';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Switch, Tabs } from 'antd';
import { useEffect, useState } from 'react';

const formalNamespace = 'low-code';
const grayNamespace = 'gray-low-code';

const EnvDeployInfo: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [envId, setEnvId] = useState<number>(0);
  const [envName, setEnvName] = useState<string>('');
  const [namespace, setNamespace] = useState<string>(formalNamespace);
  const toggleNamespace = (checked: boolean) => {
    setNamespace(checked ? formalNamespace : grayNamespace);
  };
  const columns: ProColumns<API.DeploymentWithContainers>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '命名空间',
      renderText: () => {
        return namespace;
      },
    },
    {
      title: '应用部署名',
      dataIndex: 'deploymentName',
      copyable: true,
    },
    {
      title: '当前镜像名',
      dataIndex: 'containers',
      copyable: true,
      renderText: (_, record) => {
        let containerNames = Object.keys(record.containers);
        let images = containerNames.map((name) => {
          return record.containers[name];
        });
        return images.join('\n');
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
              // 每次切换 tab，都默认恢复为正式的命名空间
              setNamespace(formalNamespace);
              setEnvId(Number(key));
              let result = data.find((item) => item.id === Number(key));
              if (result) {
                setEnvName(result.name);
              }
            }}
            items={data.map((item) => ({
              key: item.id.toString(),
              label: item.description,
            }))}
          />
          <ProTable
            search={false}
            columns={columns}
            params={{ envId: envId, namespace: namespace }}
            request={fetchDeploymentBasicInfos}
            headerTitle={
              (envName.includes('drill') || envName.includes('inner')) && (
                <Switch
                  onChange={toggleNamespace}
                  checked={namespace === formalNamespace}
                  checkedChildren="正式命名空间"
                  unCheckedChildren="灰度命名空间"
                />
              )
            }
          />
        </>
      )}
    </PageContainer>
  );
};

export default EnvDeployInfo;
