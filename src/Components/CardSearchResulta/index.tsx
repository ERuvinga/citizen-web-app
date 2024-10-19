import Image from 'next/image';
import HashtagComponent from '../Hashtag';
import {
  ChatBubbleOvalLeftIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface DatasCard {
  idPub?: string;
  dates: number;
  userPublish: {
    userId: string;
    name: string;
    picture: string;
  };
  titlePub: string;
  HeaderPub: string;
  likes: number;
  comments: number;
  tags: [];
  view: number;
  imagePub?: string;
}

interface DatasMiniCard {
  idPub: string;
  dates?: number;
  titlePub: string;
  HeaderPub: string;
  imagePub?: string;
  tags: [];
  picture: string;
}
// const newPub = () => {
//   fetch(`http://127.0.0.1:4002/pub/new`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((dats) => {
//       dats.json().then((datasjson) => console.log(datasjson));
//     })
//     .catch((error) => console.log(error));
// };

const CardOfPub = (data: DatasCard) => {
  return (
    <section className=" MainContainerCard" onClick={() => null}>
      <div className="TextPub">
        <div className="UserPub">
          <Image
            className="profilImg"
            src={data.userPublish.picture}
            width={500}
            height={500}
            alt="profilImage"
          />
          <div className=" DateName">
            <span className=" nameUser">{data.userPublish.name}</span>
            <span className=" dateUser">il y a 1 jour</span>
          </div>
        </div>
        <div className="descriptionText">
          <span className="TitleDesc">{data.titlePub}</span>
          <div className="ContentDesc">{data.HeaderPub}</div>
          <div className="containerHastag">
            {data.tags.map((val, index) => (
              <HashtagComponent
                label={val}
                closable={false}
                key={`${index}_${val}`}
              />
            ))}
          </div>
        </div>
        <div className="AnalysDatas">
          <div className="likesComments">
            <span className="Likes">
              <HandThumbUpIcon className="icone" />
              <span>{data.likes}</span>
            </span>
            <span className="comments">
              <ChatBubbleOvalLeftIcon className="icone" />
              <span>{data.comments}</span>
            </span>
          </div>
          <div className="Share">
            <span className="view">
              <EyeIcon className="icone" />
              <span>{data.view}</span>
            </span>
            <span className="SharedBtn">
              <ShareIcon className="icone" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MiniCardOfPub = (data: DatasMiniCard) => {
  return (
    <section className="MiniCard" onClick={() => null}>
      <div className="TextPub">
        <Image
          width={500}
          height={500}
          alt="logo"
          src={
            data.picture && data.picture != '' ? data.picture : '/Wshimer.svg'
          }
          className="pubPicture"
        />
        <div className="descriptionText">
          <span className="TitleDesc">{data.titlePub}</span>
          <div className="ContentDesc">{data.HeaderPub}</div>
          <div className="containerHastag">
            {data.tags.map((val, index) => (
              <HashtagComponent
                label={val}
                closable={false}
                key={`${index}_${val}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="ContainerImgPub">
        {
          //<Image className="ImagePub" src={""}/>
        }
      </div>
    </section>
  );
};

export default CardOfPub;
