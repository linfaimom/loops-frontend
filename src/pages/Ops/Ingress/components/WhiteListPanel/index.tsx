import { fetchIngressWhiteList, updateIngressWhiteList } from '@/services/ingress/api';
import { PlusOutlined, SaveFilled } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import {
  Card,
  Col,
  Divider,
  Drawer,
  Flex,
  FloatButton,
  Input,
  Modal,
  Row,
  Statistic,
  Switch,
  Tag,
  message,
} from 'antd';
import { useEffect, useState } from 'react';

// 外部 SAAS 不需要配置白名单
const prodOutterIdentifier = 'outter';

type WhiteListPanelProps = {
  envId: number;
  envName: string;
  name: string;
  namespace: string;
};

const WhiteListPanel: React.FC<WhiteListPanelProps> = (props) => {
  const [messageApi, msgContextHolder] = message.useMessage();
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState<boolean>(false);
  const [addIpAddrsModalOpened, setAddIpAddrsModalOpened] = useState<boolean>(false);
  const [ipAddrs, setIpAddrs] = useState<string[]>([]);
  const [addedIpAddrs, setAddedIpAddrs] = useState<string[]>([]);
  const [addedIpAddrsStr, setAddedIpAddrsStr] = useState<string>('');
  const [removedIpAddrs, setRemovedIpAddrs] = useState<string[]>([]);
  const { data, loading, run } = useRequest(() => fetchIngressWhiteList({ ...props }), {
    manual: true,
  });
  const { loading: postDataLoading, run: runPostData } = useRequest(
    () => updateIngressWhiteList({ ipList: ipAddrs, override: true, ...props }),
    {
      manual: true,
    },
  );
  useEffect(() => {
    if (data) {
      setIpAddrs(data);
    }
  }, [data]);
  const showDrawer = () => {
    setDrawerOpened(true);
    run();
  };
  const toggleOpenEditMode = (open: boolean) => {
    if (!open && (addedIpAddrs.length > 0 || removedIpAddrs.length > 0)) {
      alert('所有变更将被还原');
      setAddedIpAddrs([]);
      setRemovedIpAddrs([]);
      run();
      if (data) {
        setIpAddrs(data);
      }
    }
    setEditEnabled(open);
  };
  const closeDrawer = () => {
    if (editEnabled) {
      toggleOpenEditMode(false);
    }
    setDrawerOpened(false);
    setAddedIpAddrs([]);
    setRemovedIpAddrs([]);
    setIpAddrs([]);
  };
  const handleAddIpAddr = (addedIpAddr: string) => {
    if (ipAddrs.includes(addedIpAddr)) {
      console.log(addedIpAddr + ' already existed, skip');
      return;
    }
    addedIpAddrs.push(addedIpAddr);
    setAddedIpAddrs(addedIpAddrs);
    ipAddrs.unshift(addedIpAddr);
    setIpAddrs(ipAddrs);
  };
  const handleRemoveIpAddr = (removedIpAddr: string) => {
    if (addedIpAddrs.includes(removedIpAddr)) {
      setAddedIpAddrs(addedIpAddrs.filter((ip) => ip !== removedIpAddr));
    } else {
      removedIpAddrs.push(removedIpAddr);
    }
    setRemovedIpAddrs(removedIpAddrs);
    setIpAddrs(ipAddrs.filter((ip) => ip !== removedIpAddr));
  };
  const previewChangesAndConfirm = () => {
    setConfirmModalOpened(true);
  };
  const submitChanges = async () => {
    await runPostData();
    messageApi.success('更新成功');
    setConfirmModalOpened(false);
    setEditEnabled(false);
    setAddedIpAddrs([]);
    setRemovedIpAddrs([]);
  };
  return (
    <div>
      {msgContextHolder}
      {!props.envName.includes(prodOutterIdentifier) && <a onClick={showDrawer}>白名单</a>}
      <Drawer
        size="large"
        title={props.name}
        onClose={closeDrawer}
        open={drawerOpened}
        loading={loading}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic title="总计" value={ipAddrs.length} valueStyle={{ color: '#3f8600' }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="IP 数"
                value={ipAddrs.length - ipAddrs.filter((ip: string) => ip.includes('/')).length}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="CIDR 数"
                value={ipAddrs.filter((ip: string) => ip.includes('/')).length}
              />
            </Card>
          </Col>
        </Row>
        <Divider plain={true}>
          <Switch
            onChange={toggleOpenEditMode}
            checked={editEnabled}
            checkedChildren="编辑模式"
            unCheckedChildren="只读模式"
          />
          {editEnabled && <>（变动仅为实时预览，最终生效需点按钮保存）</>}
        </Divider>
        <Flex gap="4px 0" wrap>
          {editEnabled && (
            <Tag
              color="blue"
              onClick={() => {
                setAddIpAddrsModalOpened(true);
              }}
            >
              <PlusOutlined />
              批量新增
            </Tag>
          )}
          {ipAddrs.map((ip: string) => {
            return (
              <Tag
                closable={editEnabled}
                key={ip}
                onClose={() => handleRemoveIpAddr(ip)}
                color={addedIpAddrs.includes(ip) ? 'blue' : 'default'}
              >
                {ip}
              </Tag>
            );
          })}
        </Flex>
        {editEnabled && (addedIpAddrs.length > 0 || removedIpAddrs.length > 0) && (
          <FloatButton
            shape="circle"
            type="primary"
            icon={<SaveFilled />}
            tooltip="确认变动并保存"
            onClick={previewChangesAndConfirm}
          />
        )}
        <Modal
          title="批量新增"
          open={addIpAddrsModalOpened}
          onOk={() => {
            addedIpAddrsStr.split('\n').forEach((item) => {
              handleAddIpAddr(item);
            });
            setAddedIpAddrsStr('');
            setAddIpAddrsModalOpened(false);
          }}
          onCancel={() => {
            setAddedIpAddrsStr('');
            setAddIpAddrsModalOpened(false);
          }}
        >
          <Input.TextArea
            autoSize
            placeholder="请输入 ip / cidr 并回车换行以进行分割（重复内容将被剔除）"
            value={addedIpAddrsStr}
            onChange={(e) => setAddedIpAddrsStr(e.target.value)}
          />
        </Modal>
        <Modal
          title="变动内容最终确认"
          open={confirmModalOpened}
          onOk={submitChanges}
          confirmLoading={postDataLoading}
          onCancel={() => {
            setConfirmModalOpened(false);
          }}
        >
          <p>删除的内容（共 {removedIpAddrs.length} 条）</p>
          {removedIpAddrs.map((ip: string) => {
            return (
              <Tag key={ip} color={'red'}>
                {ip}
              </Tag>
            );
          })}
          <Divider />
          <p>新增的内容（共 {addedIpAddrs.length} 条）</p>
          {addedIpAddrs.map((ip: string) => {
            return (
              <Tag key={ip} color={'blue'}>
                {ip}
              </Tag>
            );
          })}
        </Modal>
      </Drawer>
    </div>
  );
};

export default WhiteListPanel;
