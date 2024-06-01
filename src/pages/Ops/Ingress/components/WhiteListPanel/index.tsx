import { fetchIngressWhiteList, updateIngressWhiteList } from '@/services/ingress/api';
import { SaveFilled } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import {
  Card,
  Col,
  Divider,
  Drawer,
  Flex,
  FloatButton,
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
  const [messageApi, contextHolder] = message.useMessage();
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState<boolean>(false);
  const [editEnabled, setEditEnabled] = useState<boolean>(false);
  const [ipAddrs, setIpAddrs] = useState<string[]>([]);
  const [addedIpAddrs, setAddedIpAddrs] = useState<string[]>([]);
  const [removedIpAddrs, setRemovedIpAddrs] = useState<string[]>([]);
  const { data, run } = useRequest(() => fetchIngressWhiteList({ ...props }), { manual: true });
  const { run: runPostData, error } = useRequest(
    () => updateIngressWhiteList({ ipList: ipAddrs, override: true, ...props }),
    { manual: true },
  );
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setIpAddrs(data);
    }
  }, [data]);
  const showDrawer = () => {
    setDrawerOpened(true);
    run();
  };
  const closeDrawer = () => {
    setDrawerOpened(false);
    setEditEnabled(false);
    setIpAddrs([]);
    setAddedIpAddrs([]);
    setRemovedIpAddrs([]);
  };
  const toggleOpenEditMode = (open: boolean) => {
    setEditEnabled(open);
  };
  const handleRemoveIpAddr = (removedIpAddr: string) => {
    setIpAddrs(ipAddrs.filter((ip) => ip !== removedIpAddr));
    removedIpAddrs.push(removedIpAddr);
    setRemovedIpAddrs(removedIpAddrs);
  };
  const previewChangesAndConfirm = () => {
    setConfirmModalOpened(true);
  };
  return (
    <div>
      {contextHolder}
      <a onClick={showDrawer}>白名单</a>
      <Drawer size="large" title={props.name} onClose={closeDrawer} open={drawerOpened}>
        {Array.isArray(data) && (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="总计"
                    value={ipAddrs.length}
                    valueStyle={{ color: '#3f8600' }}
                  />
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
              {ipAddrs.map((ip: string) => {
                return (
                  <Tag
                    closable={editEnabled}
                    key={ip}
                    color={ip.includes('/') ? 'orange' : 'blue'}
                    onClose={() => handleRemoveIpAddr(ip)}
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
                tooltip="预览并保存"
                onClick={previewChangesAndConfirm}
              />
            )}
            <Modal
              title="变动预览"
              open={confirmModalOpened}
              onOk={async () => {
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
              }}
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
            </Modal>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default WhiteListPanel;
