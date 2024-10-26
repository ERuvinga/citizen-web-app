import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//Components
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';
import AuthNavBar from '@/Components/Auth/AuthNavBar';
import HomeMenu from '@/Components/Auth/Menu';
import BtnTypePost from '@/Components/Auth/TypeContentButton';
import ForumsDisplayResults from '@/Components/Auth/Views/Post';
import DebatsDisplayResults from '@/Components/Auth/Views/Debates';

//Customs Hooks
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import useToken, { Token } from '@/hooks/useToken';

//Atos and states
import { HomeFilterSelected } from '@/state/user';
import { useRecoilState } from 'recoil';

//Style and Constants
import AuthStyle from '@/pages/Auth/Home/Home.module.css';
import { FILTERSPOSTS } from '@/Constants/Type';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

const AuthHome = () => {
  //states
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [MyToken, setMyToken] = useState({} as Token);
  const [CheckUserSessionloading, setCheckUserSessionloading] = useState(true);

  //Hooks
  const navigation = useRouter();

  // checking datas of User
  useEffect(() => {
    setStorage(useLocalStorage);
    setMyToken(useToken);

    // Checking if User have a valid Session
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useToken().LogInState().isLogin) {
      console.log('User Login');
      setCheckUserSessionloading(false); // Display Home Page
    } else {
      console.log('User Logout');
      navigation.replace('/Login');
    }
  }, []);

  //Filter datas
  const [FilterPost, setFilterPost] = useRecoilState(HomeFilterSelected);
  const FiltersTab = [
    {
      label: 'Forums',
      value: FILTERSPOSTS.POSTS,
    },
    {
      label: 'Debats',
      value: FILTERSPOSTS.DEBATES,
    },
    {
      label: 'Sondages',
      value: FILTERSPOSTS.POLL,
    },
    {
      label: 'Meetings',
      value: FILTERSPOSTS.MEETINGS,
    },
  ];

  const SelectViewToDisplayDatas = (filter: string) => {
    switch (filter) {
      case FILTERSPOSTS.POSTS: {
        return <ForumsDisplayResults MyToken={MyToken.getToken()} />;
      }
      case FILTERSPOSTS.DEBATES: {
        return <DebatsDisplayResults MyToken={MyToken.getToken()} />;
      }
      // case FILTERSPOSTS.POLL: {
      //     return (
      //         <PollDisplaResults
      //             From="HOME"
      //             keyword=""
      //             searching={false}
      //             resetSearchState={() => null}
      //         />
      //     );
      // }
      // case FILTERSPOSTS.MEETINGS: {
      //     return (
      //         <MeetingsDisplayResults
      //             navigation={() =>
      //                console.log("datas ...")
      //             }
      //             From="HOME"
      //             keyword=""
      //             searching={false}
      //             resetSearchState={() => null}
      //         />
      //     );
    }
  };

  return (
    <>
      <HeadDatas title="Home" description="Home, Citizen Voice Lab page" />
      {CheckUserSessionloading ? (
        <Loading hiddenText={false} contenteText="Chargement..." />
      ) : (
        <main className={AuthStyle.HomeContainer}>
          <AuthNavBar userDatas={Storage.getAllDatas()} />
          <section className={`${AuthStyle.ContainerApp}`}>
            <HomeMenu userDatas={Storage.getAllDatas()} />
            <section className={`${AuthStyle.ContentDatas}`}>
              <div className={`${AuthStyle.NavTitle} `}>
                <h1>Accueil</h1>
                <div className={`${AuthStyle.Buttons}`}>
                  <MagnifyingGlassIcon width={28} height={28} color="#9ba1a6" />
                  <div className={`${AuthStyle.Filter}`}>
                    <AdjustmentsHorizontalIcon
                      width={23}
                      height={23}
                      color="#ebf1ff"
                    />
                  </div>
                </div>
              </div>
              <section className={`${AuthStyle.ContainerApp}`}>
                <div className={`${AuthStyle.datasPub}`}>
                  {SelectViewToDisplayDatas(FilterPost)}
                </div>
                <aside className={`${AuthStyle.FilterList}`}>
                  <span className={`${AuthStyle.Title}`}>Filtrage </span>
                  <div className={`${AuthStyle.containerItems}`}>
                    {FiltersTab.map((item, index) => (
                      <BtnTypePost
                        value={item.value}
                        label={item.label}
                        action={() => setFilterPost(item.value)}
                        key={`${item.label}_${index}`}
                        Selected={FilterPost}
                      />
                    ))}
                  </div>
                </aside>
              </section>
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default AuthHome;
