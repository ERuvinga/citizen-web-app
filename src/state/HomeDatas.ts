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
        "Engagez-vous dans des débats passionnants sur des sujets captivants et stimulants qui suscitent la réflexion et encouragent des échanges d'idées enrichissants.",
      Icone: Icone.DEBATS,
      linkToTool: '#',
    },
    {
      NameTool: 'Forums',
      DescriptionTool:
        "Partagez vos opinions sur des forums dédiés, où vous pourrez échanger vos idées, dialoguer avec d'autres passionnés et enrichir la discussion avec des perspectives variées et nuancées.",
      Icone: Icone.FORUM,
      linkToTool: '#',
    },
    {
      NameTool: 'Des Sondages',
      DescriptionTool:
        'Engagez-vous activement en participant à des sondages, contribuant ainsi à la collecte de données précieuses et à la compréhension des opinions collectives tout en vous exprimant sur des sujets qui vous tiennent à cœur.',
      Icone: Icone.POLLS,
      linkToTool: '#',
    },
    {
      NameTool: 'Mobilisations',
      DescriptionTool:
        "Mobilisez-vous pour soutenir des actions collectives au sein de votre communauté, en vous unissant avec d'autres membres pour promouvoir des initiatives qui favorisent la solidarité, l'engagement civique et le changement positif.",
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
