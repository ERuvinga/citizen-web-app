//Datas

//Deign
import { PlatformInfo } from '@/state/user';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface inputDatasDefinition {
  fromPage: string;
  placehold: string;
  label: string;
  type: string;
  idField?: number;
}

const InputField = (datas: inputDatasDefinition) => {
  // states & atoms
  const [Icone, setIcone] = useState(<></>);
  const [platformInfos, setPlatformInfos] = useRecoilState(PlatformInfo);

  useEffect(() => {
    switch (datas.label) {
      case 'email': {
        setIcone(<EnvelopeIcon className="formIcone" />);
        break;
      }
      case 'password': {
        setIcone(<LockClosedIcon className="formIcone" />);
        break;
      }
      case 'name': {
        setIcone(<UserIcon className="formIcone" />);
        break;
      }
    }
    setPlatformInfos(navigator.userAgent);
  }, []);
  return (
    <div className="FieldsContainer">
      <>{Icone}</>
      <input
        className={
          platformInfos.match(/iPhone/)
            ? 'AppleAdjust inputField'
            : 'inputField'
        }
        placeholder={datas.placehold}
        type={datas.type}
      />
    </div>
  );
};
export default InputField;
