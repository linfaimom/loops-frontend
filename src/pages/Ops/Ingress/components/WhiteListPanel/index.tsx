import { fetchIngressWhiteList, updateIngressWhiteList } from '@/services/ingress/api';
import { DeleteOutlined, PlusOutlined, SaveFilled } from '@ant-design/icons';
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

type WhiteListPanelProps = {
  envId: number;
  name: string;
  namespace: string;
};

const WhiteListPanel: React.FC<WhiteListPanelProps> = (props) => {
  const [messageApi, msgContextHolder] = message.useMessage();
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState<boolean>(false);
  const [addIpAddrsModalOpened, setAddIpAddrsModalOpened] = useState<boolean>(false);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [ipAddrs, setIpAddrs] = useState<string[]>([]);
  const [addedIpAddrs, setAddedIpAddrs] = useState<string[]>([]);
  const [removedIpAddrs, setRemovedIpAddrs] = useState<string[]>([]);
  const { data, loading, run } = useRequest(() => fetchIngressWhiteList({ ...props }), {
    manual: true,
  });
  const {
    loading: postDataLoading,
    run: runPostData,
    error,
  } = useRequest(() => updateIngressWhiteList({ ipList: ipAddrs, override: true, ...props }), {
    manual: true,
  });
  useEffect(() => {
    if (data && Array.isArray(data)) {
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
      setIpAddrs(data as string[]);
      setAddedIpAddrs([]);
      setRemovedIpAddrs([]);
    }
    setEditEnabled(open);
  };
  const closeDrawer = () => {
    if (editEnabled) {
      toggleOpenEditMode(false);
    }
    setDrawerOpened(false);
    setIpAddrs([]);
    setAddedIpAddrs([]);
    setRemovedIpAddrs([]);
  };
  const handleRemoveIpAddr = (removedIpAddr: string) => {
    setIpAddrs(ipAddrs.filter((ip) => ip !== removedIpAddr));
    removedIpAddrs.push(removedIpAddr);
    setRemovedIpAddrs(removedIpAddrs);
  };
  const previewChangesAndConfirm = () => {
    setConfirmModalOpened(true);
  };
  const submitChanges = async () => {
    await runPostData();
    if (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    } else {
      messageApi.open({
        type: 'success',
        content: '更新成功',
      });
    }
    setConfirmModalOpened(false);
    setEditEnabled(false);
    setAddedIpAddrs([]);
    setRemovedIpAddrs([]);
  };
  return (
    <div>
      {msgContextHolder}
      <a onClick={showDrawer}>白名单</a>
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
          编辑模式 <Switch onChange={toggleOpenEditMode} checked={editEnabled} />
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
          {editEnabled && ipAddrs.length > 0 && (
            <Tag
              color="red"
              onClick={() => {
                setRemovedIpAddrs(ipAddrs);
                setIpAddrs([]);
              }}
            >
              <DeleteOutlined />
              全部清空
            </Tag>
          )}
          {ipAddrs.map((ip: string) => {
            return (
              <Tag closable={editEnabled} key={ip} onClose={() => handleRemoveIpAddr(ip)}>
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
            tooltip="预览并保存"
            onClick={previewChangesAndConfirm}
          />
        )}
        <Modal
          title="批量新增"
          open={addIpAddrsModalOpened}
          onOk={() => {
            setAddIpAddrsModalOpened(false);
          }}
          onCancel={() => {
            setAddIpAddrsModalOpened(false);
          }}
        >
          <Input.TextArea autoSize placeholder="请输入 ip / cidr 并以换行分割"></Input.TextArea>
        </Modal>
        <Modal
          title="变动预览"
          open={confirmModalOpened}
          okText={'确认提交'}
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
