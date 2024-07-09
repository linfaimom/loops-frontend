import { fetchDeploymentBasicInfos } from '@/services/deployment/api';
import { fetchEnvs } from '@/services/env/api';
import { SwapOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, FloatButton, Modal, Select, Space, Switch, Tabs, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

type compareInfo = {
  envId: number;
  envName?: string;
  namespace: string;
};

type comparePair = {
  srcInfo: compareInfo;
  destInfo: compareInfo;
};

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

const buildInfoTxt = (rawData: API.DeploymentWithContainers[]): string => {
  return rawData
    .map((item) => {
      if (components.includes(item.deploymentName)) {
        let containerNames = Object.keys(item.containers);
        let images = containerNames
          .map((name) => {
            return item.containers[name];
          })
          .map((item) => {
            return item.split('/')[2];
          });
        let imagesTxt = images.join(';');
        return item.deploymentName + ' => ' + imagesTxt;
      }
      return '';
    })
    .filter((v) => v !== '')
    .sort()
    .join('\n\n');
};

const EnvDeployInfo: React.FC = () => {
  const { data } = useRequest(() => fetchEnvs());
  const [envId, setEnvId] = useState<number>(0);
  const [envName, setEnvName] = useState<string>('');
  const [envDesc, setEnvDesc] = useState<string>('');
  // 为了让 modal 中 onOK 函数能及时拿到 selectedEnvs 的变动，只能用 ref 方法了；useState 方式会有延迟，不懂，先这样吧～～～
  const selectedEnvsRef = useRef<string[]>([]);
  const setSelectedEnvs = (values: string[]) => {
    selectedEnvsRef.current = values;
  };
  const [namespace, setNamespace] = useState<string>(formalNamespace);
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, msgContextHolder] = message.useMessage();

  useEffect(() => {
    if (data && data.length > 0) {
      setEnvId(data[0].id);
    }
  }, [data]);

  const toggleNamespace = (checked: boolean) => {
    setNamespace(checked ? formalNamespace : grayNamespace);
  };

  const showDiff = async (comparePair: comparePair) => {
    // src env 命名空间的信息
    let srcEnvNsInfoResp = await fetchDeploymentBasicInfos({
      envId: comparePair.srcInfo.envId,
      namespace: comparePair.srcInfo.namespace,
    });
    let srcEnvNsInfoTxt = buildInfoTxt(srcEnvNsInfoResp.data);
    // dest env 命名空间的信息
    let destEnvNsInfoResp = await fetchDeploymentBasicInfos({
      envId: comparePair.destInfo.envId,
      namespace: comparePair.destInfo.namespace,
    });
    let destEnvNsInfoTxt = buildInfoTxt(destEnvNsInfoResp.data);
    // 展示 Diff
    modal.info({
      width: 2000,
      content: (
        <ReactDiffViewer
          leftTitle={comparePair.srcInfo.envName + ' (' + comparePair.srcInfo.namespace + ')'}
          oldValue={srcEnvNsInfoTxt}
          rightTitle={comparePair.destInfo.envName + ' (' + comparePair.destInfo.namespace + ')'}
          newValue={destEnvNsInfoTxt}
          compareMethod={DiffMethod.LINES}
        />
      ),
    });
  };

  const handleSelectChange = (envIds: string[]) => {
    setSelectedEnvs(envIds);
  };

  const showEnvSelectorInModal = () => {
    let options = data?.map((item) => {
      return {
        label: item.description,
        value: item.id,
      };
    });
    modal.confirm({
      title: '请选择需对比的两个环境',
      content: (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          options={options}
          onChange={handleSelectChange}
        />
      ),
      onOk: () => {
        const currentSelectedEnvs = selectedEnvsRef.current;
        if (currentSelectedEnvs.length !== 2) {
          messageApi.warning('仅支持填写 2 个环境哦～～重新填一下吧');
          return;
        }
        showDiff({
          srcInfo: {
            envId: Number(currentSelectedEnvs[0]),
            namespace: formalNamespace,
            envName: options?.find((item) => item.value === Number(currentSelectedEnvs[0]))?.label,
          },
          destInfo: {
            envId: Number(currentSelectedEnvs[1]),
            namespace: formalNamespace,
            envName: options?.find((item) => item.value === Number(currentSelectedEnvs[1]))?.label,
          },
        });
        setSelectedEnvs([]);
      },
      onClose: () => {
        setSelectedEnvs([]);
      },
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
  return (
    <PageContainer>
      {msgContextHolder}
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
                setEnvDesc(result.description);
              }
            }}
            items={data.map((item) => ({
              key: item.id.toString(),
              label: item.description,
            }))}
          />
          <FloatButton
            shape="circle"
            type="primary"
            tooltip="对比环境镜像差异"
            icon={<SwapOutlined />}
            onClick={showEnvSelectorInModal}
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
                  <Button
                    size="small"
                    onClick={() =>
                      showDiff({
                        srcInfo: { envId: envId, namespace: grayNamespace, envName: envDesc },
                        destInfo: { envId: envId, namespace: formalNamespace, envName: envDesc },
                      })
                    }
                  >
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
