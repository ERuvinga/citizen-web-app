import { atom } from 'recoil';

export const itemSelected = atom({
  key: 'itemSelected',
  default: 10,
});

export const StateOfNav = atom({
  key: 'StateOfNav',
  default: false,
});

export const NavBarDatas = atom({
  key: 'NavBarDatas',
  default: [
    {
      label: 'Accueil',
      link: '/',
    },
    {
      label: 'Explorer',
      link: '/FactCheck',
    },
    {
      label: 'A propos',
      link: '/About',
    },
  ],
});
