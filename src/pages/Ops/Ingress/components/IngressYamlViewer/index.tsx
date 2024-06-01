import { fetchIngressYaml } from '@/services/ingress/api';
import { yaml } from '@codemirror/lang-yaml';
import { quietlight } from '@uiw/codemirror-theme-quietlight';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useRequest } from '@umijs/max';
import { Drawer } from 'antd';
import { useState } from 'react';

type IngressYamlViewerProps = {
  envId: number;
  name: string;
  namespace: string;
};

const IngressYamlViewer: React.FC<IngressYamlViewerProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { data, run } = useRequest(
    () => fetchIngressYaml({ envId: props.envId, namespace: props.namespace, name: props.name }),
    { manual: true },
  );
  const showDrawer = () => {
    setOpen(true);
    run();
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <a onClick={showDrawer}>YAML</a>
      <Drawer size="large" title={props.name} onClose={onClose} open={open}>
        <ReactCodeMirror
          value={data}
          readOnly={true}
          theme={quietlight}
          extensions={[yaml()]}
        ></ReactCodeMirror>
      </Drawer>
    </div>
  );
};

export default IngressYamlViewer;
