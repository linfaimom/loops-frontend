import { fetchDeploymentBasicInfos } from '@/services/deployment/api';
import { fetchEnvs } from '@/services/env/api';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Modal, Space, Switch, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

const formalNamespace = 'low-code';
const grayNamespace = 'gray-low-code';
const components = [
  'lcap',
  'lcap-fe',
  'nasl-generator',
  'nasl-generator-new',
  'nasl-generator-fe',
  'nasl-storage',
  'owl',
  'nuims',
  'nl2nasl',
  'nl2nasl-backend',
  'codewave-insight',
  'lcap-debugger',
];

const EnvDeployInfo: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [envId, setEnvId] = useState<number>(0);
  const [envName, setEnvName] = useState<string>('');
  const [namespace, setNamespace] = useState<string>(formalNamespace);
  const [modal, contextHolder] = Modal.useModal();
  const toggleNamespace = (checked: boolean) => {
    setNamespace(checked ? formalNamespace : grayNamespace);
  };
  const showNamespaceDiffView = async () => {
    // 正式命名空间的信息
    let formalInfoResp = await fetchDeploymentBasicInfos({
      envId: envId,
      namespace: formalNamespace,
    });
    let formalInfo = formalInfoResp.data;
    // 灰度命名空间的信息
    let grayInfoResp = await fetchDeploymentBasicInfos({
      envId: envId,
      namespace: grayNamespace,
    });
    let grayInfo = grayInfoResp.data;
    // 仅比对关注的组件即可
    let grayInfoTxt = grayInfo
      .map((item) => {
        if (components.includes(item.deploymentName)) {
          let containerNames = Object.keys(item.containers);
          let images = containerNames.map((name) => {
            return item.containers[name];
          });
          let imagesTxt = images.join(';');
          return item.deploymentName + ' => ' + imagesTxt;
        }
        return '';
      })
      .filter((v) => v !== '')
      .sort()
      .join('\n\n');
    let formalInfoTxt = formalInfo
      .map((item) => {
        if (components.includes(item.deploymentName)) {
          let containerNames = Object.keys(item.containers);
          let images = containerNames.map((name) => {
            return item.containers[name];
          });
          let imagesTxt = images.join(';');
          return item.deploymentName + ' => ' + imagesTxt;
        }
        return '';
      })
      .filter((v) => v !== '')
      .sort()
      .join('\n\n');
    // 展示 Diff
    modal.info({
      width: 2000,
      content: (
        <ReactDiffViewer
          leftTitle={'灰度命名空间'}
          oldValue={grayInfoTxt}
          rightTitle={'正式命名空间'}
          newValue={formalInfoTxt}
          compareMethod={DiffMethod.LINES}
        />
      ),
    });
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
      {contextHolder}
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
                <Space>
                  <Switch
                    onChange={toggleNamespace}
                    checked={namespace === formalNamespace}
                    checkedChildren="正式命名空间"
                    unCheckedChildren="灰度命名空间"
                  />
                  <Button size="small" onClick={() => showNamespaceDiffView()}>
                    对比命名空间镜像差异
                  </Button>
                </Space>
              )
            }
          />
        </>
      )}
    </PageContainer>
  );
};

export default EnvDeployInfo;
