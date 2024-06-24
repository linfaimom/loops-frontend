import { fetchCorpEgresses } from '@/services/corpegress/api';
import { CopyOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';

const columns: ProColumns<API.Egress>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '归属地区',
    dataIndex: 'area',
  },
  {
    title: 'IP 地址',
    dataIndex: 'addr',
    copyable: true,
  },
  {
    title: '标签',
    dataIndex: 'tag',
  },
];

const CorpEgress: React.FC = () => {
  const { data } = useRequest(() => fetchCorpEgresses({ getResponse: true }));
  const [messageApi, msgContextHolder] = message.useMessage();
  let egresses = data as API.Egress[];
  const copyAllAddrs = async () => {
    if (egresses) {
      let addrs = egresses?.map((egress) => {
        return egress.addr;
      });
      copy(addrs.join('\n'));
      messageApi.success('已拷贝至剪切板');
    }
  };
  return (
    <PageContainer>
      {msgContextHolder}
      <ProTable
        columns={columns}
        dataSource={data}
        search={false}
        headerTitle={
          <Button type="primary" onClick={copyAllAddrs} icon={<CopyOutlined />}>
            一键拷贝全部 IP 地址
          </Button>
        }
      />
    </PageContainer>
  );
};

export default CorpEgress;
