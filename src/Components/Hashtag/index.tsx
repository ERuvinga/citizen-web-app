import { XMarkIcon } from '@heroicons/react/24/outline';

interface DatasHash {
  label: string;
  closable: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closedFunction?: any;
  indexInTab?: number;
}

const HashtagComponent = (datas: DatasHash) => {
  return (
    <span className="HashtagComponent">
      {datas.closable && datas.label != '#All' ? (
        <span
          className="subIcone"
          onClick={() => datas.closedFunction(datas.indexInTab)}
        >
          <XMarkIcon className="icone" />
        </span>
      ) : null}
      <span className="HashtagView">{datas.label}</span>
    </span>
  );
};

export default HashtagComponent;
