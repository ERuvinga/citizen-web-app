// import Image from "next/image";
// import {
//   ChatBubbleOvalLeftIcon,
//   HandThumbUpIcon,
// } from "@heroicons/react/24/outline";
// import { PostWithCommentsDatas, UserRole } from "@/Constants/Type";
// import { API } from "@/state/Api";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import useDate from "@/hooks/useDate";
// import { PostSelected } from "@/state/user";
// import useLocalStorage from "@/hooks/UselocalDatas";
// import { useMutateWithToken } from "@/hooks/useFetch";
// import { useState } from "react";
// import { PostsDatasReloading } from "@/state/Posts";

// interface datasVerticalCard {
//   postDatas: PostWithCommentsDatas;
//   MyToken : string | null
// }
// const CardOfForums = (datas: datasVerticalCard) => {

//       //states
//       const setPost = useSetRecoilState(PostSelected);
//       const LocalStorage = useLocalStorage();
//       const UseDate = useDate(datas.postDatas.date);
//       const MyToken = datas.MyToken;
//       const Api = useRecoilValue(API);

//       //Defines Datas
//       const isAuthority =
//           datas.postDatas.userId.AccountType == UserRole.AUTHORITY;
//       //handles
//       const handleCardClick = () => {
//           //updated Product Id
//           setPost(datas.postDatas);

//           //go To Item Card
//           console.log("go To Profile Card");
//       };

//       //hooks To fetching data
//       const LikedPostQuerries = useMutateWithToken();

//       //Loaders
//       const [LoadingLikeBtn, setLoadingLikeBtn] = useState(false);
//       const [ReloadingPost, setReloadingPost] =
//           useRecoilState(PostsDatasReloading);

//       //States App User
//       // const isOwnerUser = datas.postDatas.userId
//       //     ? LocalStorage.getIdUser() == datas.postDatas.userId._id
//       //     : false;
//       const LikedBuyMe = datas.postDatas.likedBy.filter(
//           (item) => LocalStorage.getIdUser() == item
//       );

//       const isLiked = LikedBuyMe.length;
//       const LikePost = () => {
//           setLoadingLikeBtn(true);
//           LikedPostQuerries.mutate({
//               methode: "POST",
//               ApiLink: `${Api.LINK}`,
//               EndPoint: `${Api.LIKES_POSTS}`,
//               dataToSending: {
//                   postId: datas.postDatas._id,
//               },
//               handleError: (error) => console.log(error.response),
//               handleSuccess: () => {
//                   //Refresh List Meeting
//                   setReloadingPost(!ReloadingPost);
//                   setLoadingLikeBtn(false);
//               },
//               Authorization: MyToken,
//           });
//       };

//       const UnLikesPost = () => {
//           setLoadingLikeBtn(true);
//           LikedPostQuerries.mutate({
//               methode: "POST",
//               ApiLink: `${Api.LINK}`,
//               EndPoint: `${Api.UNLIKES_POSTS}`,
//               dataToSending: {
//                   postId: datas.postDatas._id,
//               },
//               handleError: (error) => console.log(error.response),
//               handleSuccess: () => {
//                   //Refresh List Meeting
//                   setReloadingPost(!ReloadingPost);
//                   setLoadingLikeBtn(false);
//               },
//               Authorization: MyToken,
//           });

//           // setLoadingLikeBtn(true);
//           // LikedPostQuerries.mutate({
//           //     methode: "DELETE",
//           //     ApiLink: `${Api.LINK}`,
//           //     EndPoint: `${Api.INTEREST}/${LikesDatas[0]}`,
//           //     dataToSending: {},
//           //     handleError: (error) => console.log(error.response),
//           //     handleSuccess: () => {
//           //         //Refresh List Meeting
//           //         setReloadingPost(!ReloadingPost);
//           //         setLoadingLikeBtn(false);
//           //     },
//           //     Authorization: MyToken,
//           // });
//       };
//   return (
//     <section className=" MainContainerCard" onClick={() => null}>
//       <div className="TextPub">
//         <div className="UserPub">
//           <Image
//             className="profilImg"
//             src={datas.postDatas.userId.imageProfile}
//             width={500}
//             height={500}
//             alt="profilImage"
//           />
//           <div className=" DateName">
//             <span className=" nameUser">{`${datas.postDatas.userId.firstName} ${datas.postDatas.userId.lastName}`}</span>
//             <span className=" dateUser">il y a 1 jour</span>
//           </div>
//         </div>
//         <div className="descriptionText">
//           <span className="TitleDesc">{datas.postDatas.title}</span>
//           <div className="ContentDesc">{datas.postDatas.body}</div>

//         </div>
//         <div className="AnalysDatas">
//           <div className="likesComments">
//             <span className="Likes">
//               <HandThumbUpIcon className="icone" />
//               <span>{datas.postDatas.likedBy.length}</span>
//             </span>
//             <span className="comments">
//               <ChatBubbleOvalLeftIcon className="icone" />
//               <span>{datas.postDatas.comments.length}</span>
//             </span>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default CardOfForums;
