import { fetchEnvs } from '@/services/env/api';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

const EnvList: React.FC = () => {
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
  ];
  return (
    <PageContainer>
      <ProTable
        search={false}
        columns={columns}
        request={fetchEnvs}
        headerTitle={<Button type="primary">新建环境</Button>}
      />
    </PageContainer>
  );
};

export default EnvList;
