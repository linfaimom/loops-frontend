import { createEnv, deleteEnv, fetchEnvs } from '@/services/env/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  DrawerForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

const EnvList: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const showDrawer = () => {
    setDrawerOpened(true);
  };
  const columns: ProColumns<API.Env>[] = [
    {
      title: '环境 id',
      dataIndex: 'id',
    },
    {
      title: '环境名',
      dataIndex: 'name',
    },
    {
      title: '环境描述',
      dataIndex: 'description',
    },
    {
      title: 'Agent 地址',
      dataIndex: 'agentUrl',
      copyable: true,
    },
    {
      title: '操作',
      search: false,
      valueType: 'option',
      render: (_, record, index) => {
        return [
          <Popconfirm
            key={index}
            title="删除环境信息"
            description="请确认是否删除该环境信息？"
            onConfirm={async () => {
              await deleteEnv({ id: record.id });
              actionRef.current?.reload();
            }}
          >
            <a>删除</a>
          </Popconfirm>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        search={false}
        columns={columns}
        request={fetchEnvs}
        headerTitle={
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            新建环境
          </Button>
        }
      />
      <DrawerForm
        open={drawerOpened}
        onOpenChange={setDrawerOpened}
        onFinish={async (formData) => {
          console.log(formData);
          //@ts-ignore
          await createEnv({ ...formData });
          actionRef.current?.reload();
          return true;
        }}
        title="新建环境"
      >
        <ProFormText
          required
          name="name"
          label="环境名称"
          rules={[
            {
              required: true,
              message: '请输入环境名',
            },
          ]}
        />
        <ProFormTextArea name="description" label="环境描述" />
        <ProFormText
          required
          name="agentUrl"
          label="Agent 地址"
          placeholder="形如 https://loops-agent.xxxx.com"
          rules={[
            {
              required: true,
              message: '请输入 Agent 地址',
            },
          ]}
        />
        <ProForm.Group>
          <ProFormText
            name="agentAuthUser"
            width="md"
            label="Agent 认证账号"
            rules={[
              {
                required: true,
                message: '请输入 Agent 认证账号',
              },
            ]}
          />
          <ProFormText.Password
            name="agentAuthPasswd"
            width="md"
            label="Agent 认证密码"
            rules={[
              {
                required: true,
                message: '请输入 Agent 认证密码',
              },
            ]}
          />
        </ProForm.Group>
      </DrawerForm>
    </PageContainer>
  );
};

export default EnvList;
