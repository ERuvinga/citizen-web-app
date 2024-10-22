// import { useEffect, useState } from 'react';

// // atoms
// import {
//   useRecoilState,
//   useRecoilValue,
//   useResetRecoilState,
//   useSetRecoilState,
// } from 'recoil';
// import {

//   errorLogRegisterForm,
//   ForgotPwdDatas,
//   MsgServerState,
//   OTPFromScreen,
// } from '@/state/SignInUpDatas';

//components
import HeadDatas from '@/Components/Header';
// import InputField from '@/Components/InputField';
// import ButtonForm from '@/Components/BtnForm';
import BackHomeBtn from '@/Components/BackHome';
import ToastComponent from '@/Components/Toast';
// import { MessageServerType, ValidatesDatasErrors } from '@/Constants/Type';
// import { useMutate } from '@/hooks/useFetch';
// import { API } from '@/state/Api';
// import useEmail from '@/hooks/useEmail';

const OtpVerify = () => {
  return (
    <>
      <HeadDatas
        title="verification de l'adresse mail"
        description="Mot de pass oublie ?, mettez a jour facilement votre mot de passe"
      />
      <ToastComponent />
      <main className="VerifyEmailPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <BackHomeBtn />
            <div className="TilteForm TextTilteForm">
              <h1 className="PageTitle">Verification du Compte</h1>
              <p className="SubTitle">Saisissez votre adresse email</p>
            </div>
            <div className="InputsContainer">
              {/* <InputField
                placehold={'citizen@gmail.com'}
                label={'email'}
                fromPage={'ForgotPwd'}
                type={'email'}
                idField={2}
                secure={false}
                checked={true}
                ErrorType={ValidatesDatasErrors.FORGOTEMAIL}
              /> */}

              {/* <ButtonForm
                label="Envoyer"
                OnPressAction={SendEmail}
                disabled={ForgotDatas.email == ''}
              /> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OtpVerify;
