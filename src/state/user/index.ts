import { atom } from 'recoil';

export const dataUser = atom({
  key: 'dataUser',
  default: 'www.veuilleurduwebrdc.cd  Dev mode',
});

export const PlatformInfo = atom({
  key: 'PlatformInfo',
  default: '',
});
