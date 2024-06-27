import { fetchCorpEgresses } from '@/services/corpegress/api';
import { CopyOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Divider, Modal, Radio, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

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

const handleReturnJointFormat = (rawData: API.Egress[]): string => {
  let addrs = rawData?.map((egress) => {
    return egress.addr;
  });
  return addrs.join('\n');
};

const handleJsonArrFormat = (rawData: API.Egress[]): string => {
  let addrs = rawData?.map((egress) => {
    return egress.addr;
  });
  return JSON.stringify(addrs);
};

const handleNginxWhiteListFormat = (rawData: API.Egress[]): string => {
  let addrs = rawData?.map((egress) => {
    return 'allow ' + egress.addr + ';';
  });
  addrs.push('deny all;');
  return addrs.join('\n');
};

const CorpEgress: React.FC = () => {
  const { data } = useRequest(() => fetchCorpEgresses({ getResponse: true }));
  const [messageApi, msgContextHolder] = message.useMessage();
  const [formatConfirmerOpened, setFormatConfirmerOpened] = useState<boolean>(false);
  const [formatType, setFormatType] = useState<number>(0);
  const [copyableResult, setCopyableResult] = useState<string>('');
  let egresses = data as API.Egress[];
  const onFormatChange = (type: number) => {
    switch (type) {
      case 0:
        setCopyableResult(handleReturnJointFormat(egresses));
        break;
      case 1:
        setCopyableResult(handleJsonArrFormat(egresses));
        break;
      case 2:
        setCopyableResult(handleNginxWhiteListFormat(egresses));
        break;
      default:
        break;
    }
  };
  const copyAllAddrs = async () => {
    copy(copyableResult);
    messageApi.success('已拷贝至剪切板');
  };
  return (
    <PageContainer>
      {msgContextHolder}
      <ProTable
        columns={columns}
        dataSource={data}
        search={false}
        headerTitle={
          <Button
            type="primary"
            onClick={() => {
              setFormatConfirmerOpened(true);
              setCopyableResult(handleReturnJointFormat(egresses));
            }}
            icon={<CopyOutlined />}
          >
            一键拷贝全部 IP 地址
          </Button>
        }
      />
      <Modal
        title="内容格式确认"
        open={formatConfirmerOpened}
        onOk={copyAllAddrs}
        onCancel={() => {
          setFormatConfirmerOpened(false);
          setFormatType(0);
        }}
      >
        <Radio.Group
          onChange={(e) => {
            setFormatType(e.target.value);
            onFormatChange(e.target.value);
          }}
          value={formatType}
        >
          <Radio value={0}>换行符分割形式</Radio>
          <Radio value={1}>JSON 数组形式</Radio>
          <Radio value={2}>NGINX 白名单形式</Radio>
        </Radio.Group>
        <Divider></Divider>
        <TextArea value={copyableResult} autoSize={{ minRows: 3, maxRows: 10 }} />
      </Modal>
    </PageContainer>
  );
};

export default CorpEgress;
