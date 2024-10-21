// globale state for Theme App
import { atom } from 'recoil';

export const AgreeConditionState = atom({
  key: 'AgreeConditionState',
  default: false,
});

export const API = atom({
  key: 'apiDatas',
  default: {
    LINK: 'https://api-node-project-elie.onrender.com',
    SIGN_IN: '/Signin',
    SIGN_UP: '/signup',

    FORGOT_PWD: '/forgot-password',
    REGISTER_VERIFI_CODE: '/confirmCode',
    FORGOT_VERIFI_CODE: '/reset-Code',
    ACTIVE_ACCOUNT: '/api/auth/signUp/active-account/otp',
    UPDATE_USER: '/user/update',
    UPDATE_PASSWORD: '/user/change-password',

    RESET_PWD: '/reset-password',
    LOGOUT: '/logout',

    // POSTS
    POSTS: '/posts',
    DEBAT_POSTS: '/postsDebate',
    DEBAT_FILTER: '/debate/filter',
    DEBATs_POSTS: '/postDebate',
    LIKES_POSTS: '/posts/like',
    UNLIKES_POSTS: '/posts/unlike',
    POLLS: '/polls',
    VOTES_POLLS: '/polls/vote',
    MEETINGS: '/meetings',
    INTEREST: '/interests',

    //IMAGES
    UPLOAD_IMAGE: '/upload/imageprofile',
  },
});
