import React, { useEffect, useState } from 'react';

//custom Hooks
import { useCustomQueryWithToken } from '@/hooks/useFetch';

//Recoil and States
import { useRecoilState, useRecoilValue } from 'recoil';
import { API } from '@/state/Api';

//Components
import LoadingComponent from '@/Components/LoadingComponent';

//types and datas
import { REQUEST_KEYS } from '@/Constants/Type';
//import { PostsDatasReloading, PostsFetching } from '@/state/Posts';
import { ForumsLoader } from '@/state/user';
//import CardOfForums from '../../Cards/ForumCard';

interface SearchUserDatas {
  MyToken: string | null;
}

const ForumsDisplayResults = (datas: SearchUserDatas) => {
  //servers Datas
  //const [PostGetted, setPostGetted] = useRecoilState(PostsFetching);
  //const [ReloadingPost, setReloadingPost] = useRecoilState(PostsDatasReloading);
  const Api = useRecoilValue(API);

  //Loaders
  const [LoadinPosts, setLoadingPosts] = useRecoilState(ForumsLoader);
  //const [LoadinFilteredPosts, setLoadinFilteredPosts] = useState(true);
  const [LoadinRefresh, setLoadinRefresh] = useState(false);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccessPosts = (datas: any) => {
    setLoadingPosts(false);
    setLoadinRefresh(false);
    //setPostGetted(datas.posts);
    console.log(datas.posts);
  };

  //hooks To fetching datas
  const useFetchingPosts = useCustomQueryWithToken({
    key: REQUEST_KEYS.HOME_POST,
    link: `${Api.LINK}${Api.POSTS}`,
    hangleError: (error) => {
      console.log(error.response);
    },
    handleSucces: handleSuccessPosts,
    Authorization: datas.MyToken,
  });

  useEffect(
    () => {
      console.log(LoadinRefresh);
      useFetchingPosts.refetch();
      fetch(`${Api.LINK}${Api.POSTS}`, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${datas.MyToken}`,
        },
      })
        .then((result) => {
          result.json().then((datas) => {
            console.log(result);
            console.log(datas);
          });
        })
        .catch((error) => console.log(error));
    },
    [
      /*ReloadingPost*/
    ]
  );

  return (
    <>
      {LoadinPosts ? (
        <LoadingComponent hiddenText={false} contenteText="Chargement" />
      ) : (
        <section>
          {/* <CardOfForums MyToken={datas.MyToken} postDatas={null} /> */}
          datas Fetched sucess!!
        </section>
      )}
    </>
  );
};

export default ForumsDisplayResults;
