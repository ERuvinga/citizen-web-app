// import React, { useEffect, useState } from "react";

// //custom Hooks

// import { useCustomQueryWithToken } from "@/hooks/useFetch";

// //Recoil adn Atoms
// import { API } from "@/state/Api";
// import { PostsFetchingWithoutLikes } from "@/state/Posts";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { DebatesLoader } from "@/state/user";

// //Components
// import LoadingComponent from "@/Components/LoadingComponent";

// //types and datas
// import { PostWithCommentsDatas, REQUEST_KEYS } from "@/Constants/Type";
// import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

// interface SearchUserDatas {
//   MyToken: string | null;
// }

// const DebatsDisplayResults = (datas: SearchUserDatas) => {
//   //Hooks
//   const Api = useRecoilValue(API);

//   //Loaders
//   const [LoadinDebates, setLoadinDebates] = useRecoilState(DebatesLoader);
//   const [LoadinRefresh, setLoadinRefresh] = useState(false);
//   const [LoadingFilteredDebates, setLoadingFilteredDebates] = useState(true);

//   //servers Datas
//   const [DebatesValue, setDebatesValue] = useRecoilState(
//     PostsFetchingWithoutLikes
//   );
//   //eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleSuccess = (datas: any) => {
//     setLoadinDebates(false);
//     setLoadinRefresh(false);
//     setDebatesValue(datas.debates);
//   };

//   //hooks To fetching datas
//   const useFetchingPosts = useCustomQueryWithToken({
//     key: REQUEST_KEYS.GET_POSTS_WITHOUT_LIKES,
//     link: `${Api.LINK}${Api.DEBAT_POSTS}`,
//     hangleError: (error) => {
//       console.log(error.response);
//     },
//     handleSucces: handleSuccess,
//     Authorization: datas.MyToken,
//   });

//   useEffect(() => {
//     useFetchingPosts.refetch();
//   }, []);

//   return (
//     <>
//       {LoadinDebates ? (
//         <LoadingComponent hiddenText={false} contenteText="Chargement ..." />
//       ) : (
//         <section></section>
//         // <FlatList
//         //     contentContainerStyle={{
//         //         paddingBottom: 10,
//         //         paddingHorizontal: 10,
//         //         flexGrow: 1,
//         //     }}
//         //     refreshControl={
//         //         <RefreshControl
//         //             refreshing={LoadinRefresh}
//         //             onRefresh={() => {
//         //                 setLoadinRefresh(true);
//         //                 useFetchingPosts.refetch();
//         //             }}
//         //         />
//         //     }
//         //     ListEmptyComponent={
//         //         <View
//         //             style={{
//         //                 flex: 1,
//         //                 alignItems: "center",
//         //                 justifyContent: "center",
//         //             }}
//         //         >
//         //             <ChatBubbleLeftRightIcon
//         //                 size={30}
//         //                 color={AppTheme.mainText1}
//         //             />
//         //             <Text
//         //                 style={{
//         //                     fontSize: 13,
//         //                     fontFamily: AppFont.Bold,
//         //                     color: AppTheme.mainText1,
//         //                 }}
//         //             >
//         //                 Aucun Element trouvé
//         //             </Text>
//         //         </View>
//         //     }
//         //     data={DebatesValue}
//         //     initialNumToRender={200}
//         //     showsVerticalScrollIndicator={false}
//         //     keyExtractor={(item, index) =>
//         //         `${item._id}_${index}`
//         //     }
//         //     renderItem={({ item }) => {
//         //         return (
//         //             <PostWithoutLikes
//         //                 postDatas={item}
//         //                 navigation={datas.navigation}
//         //             />
//         //         );
//         //     }}
//         // />
//       )}
//     </>
//   );
// };

// export default DebatsDisplayResults;
