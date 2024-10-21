import { atom } from 'recoil';

export const dataUser = atom({
  key: 'dataUser',
  default: 'www.citizenvoiceLab.cd  Dev mode',
});

export const PlatformInfo = atom({
  key: 'PlatformInfo',
  default: '',
});
