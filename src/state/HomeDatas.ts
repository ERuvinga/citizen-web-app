/**
 *  file contente all states of Home pages
 *  tabs and states
 */

//Recoil Datas
import { atom } from 'recoil';

//Types
import { IconeTypes as Icone } from '@/Constants/Type';

const cardActionsData = atom({
  key: 'cardActionsData',
  default: [
    {
      NameTool: 'Débats',
      DescriptionTool:
        'Debatez sur des sujets interessantes etc Outil de création des documents..',
      Icone: Icone.DEBATS,
      linkToTool: '#',
    },
    {
      NameTool: 'Forums',
      DescriptionTool:
        'Exprimer vos Outil de création des documents en ligne, Debatez sur des sujets interessantes....',
      Icone: Icone.FORUM,
      linkToTool: '#',
    },
    {
      NameTool: 'Des Sondages',
      DescriptionTool: 'Outil de Votes etc., ... des documents en ligne ',
      Icone: Icone.POLLS,
      linkToTool: '#',
    },
    {
      NameTool: 'Mobilisations',
      DescriptionTool: 'Mobilisations pour les actions collectives dans .....',
      Icone: Icone.MEETINGS,
      linkToTool: '#',
    },
  ],
});

const LastPubDatas = atom({
  key: 'LastPubDatas',
  default: [],
});

const LinksToApi = atom({
  key: 'LinksToApi',
  default: {
    local: 'http://127.0.0.1:4002',
    remote: 'https://veilleur-web-backend.onrender.com',
  },
});

export { cardActionsData, LastPubDatas, LinksToApi };
