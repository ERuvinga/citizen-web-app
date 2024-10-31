//Next and Recoil
import { useRouter } from 'next/router';

//style
import OtpStyle from '@/styles/Components/Otp.module.css';

// atoms
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  ActiveAccountDatas,
  ForgotPwdDatas,
  MsgServerState,
  OTPFromScreen,
  RegisterDataStore,
  SuccessMsg,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//components
import HeadDatas from '@/Components/Header';
import BackHomeBtn from '@/Components/BackHome';
import ToastComponent from '@/Components/Toast';
import ButtonForm from '@/Components/BtnForm';
import { OtpInput } from 'reactjs-otp-input';

//Custom Hooks
import { useMutate } from '@/hooks/useFetch';
import { MessageServerType } from '@/Constants/Type';
import { useEffect } from 'react';

const OtpVerify = () => {
  //states
  const [NewPwdData, setNewPwdData] = useRecoilState(ForgotPwdDatas);
  const FromScreen = useRecoilValue(OTPFromScreen);
  const [ActiveAccountData, setActiveAccountData] =
    useRecoilState(ActiveAccountDatas);
  const Api = useRecoilValue(API);
  const RegisterDatas = useRecoilValue(RegisterDataStore);

  //Server Response State
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
  const SetSuccessMessage = useSetRecoilState(SuccessMsg);
  //Reset States
  const SetResetRegDatas = useResetRecoilState(RegisterDataStore);
  const SetResetActivateDatas = useResetRecoilState(ActiveAccountDatas);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

  // Get new Code Querry Hooks
  const useFetchingMutation = useMutate();
  const useForgotFetchingQuerryResendCode = useMutate();
  const useSendCode = useMutate();
  const navigation = useRouter();

  //Handles Functions
  const ResetAllState = () => {
    // Resets All States
    SetResetRegDatas();
    SetResetActivateDatas();
    SetResetMsgOfServerStates();
  };

  const ResetForgotDatasStates = () => {
    // Resets All States
    SetResetActivateDatas();
    SetResetMsgOfServerStates();
    setNewPwdData({ ...NewPwdData, code: '' });
    setActiveAccountData({ ...ActiveAccountData, code: '' });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleErrorFeching = (errorDatas: any) => {
    //Manage Erros
    console.log(errorDatas.response);
    SetServerMessageDisplay({
      hidden: false,
      message: 'Activation Echouée, code invalide',
      messageType: MessageServerType.ERROR,
    });
  };

  const handleSuccess = () => {
    //Reset States
    ResetAllState();

    //Succefully Action
    if (FromScreen == 'SignUp') {
      SetSuccessMessage({
        message: 'Votre Compte a été crée avec Succès',
      });
      navigation.replace('/SuccessActions');
    } else {
      navigation.replace('/ResetPassWord');
    }
  };

  useEffect(() => {
    ResetForgotDatasStates(); // reset code App
  }, []);

  //hooks To fetching datas use to send OTP to ApI and to get code an Other timer
  const OTPQuery = () => {
    FromScreen == 'SignUp'
      ? useSendCode.mutate({
          ApiLink: `${Api.LINK}`,
          EndPoint: `${Api.REGISTER_VERIFI_CODE}`,
          methode: 'POST',
          dataToSending: { confirmationCode: ActiveAccountData.code },
          handleError: handleErrorFeching,
          handleSuccess: handleSuccess,
        })
      : useSendCode.mutate({
          ApiLink: `${Api.LINK}`,
          EndPoint: `${Api.FORGOT_VERIFI_CODE}`,
          methode: 'POST',
          dataToSending: { resetToken: NewPwdData.code },
          handleError: handleErrorFeching,
          handleSuccess: handleSuccess,
        });
  };

  // send Data function
  const handleClik = () => {
    console.log(ActiveAccountData);
    console.log(NewPwdData);
    OTPQuery();
  };

  // handle get new code
  const GetNewCode = () => {
    console.log('Resend ...');
    switch (FromScreen) {
      case 'SignUp': {
        console.log(RegisterDatas);
        useFetchingMutation.mutate({
          // get new code, new Register Fetch
          methode: 'POST',
          ApiLink: `${Api.LINK}`,
          EndPoint: `${Api.SIGN_UP}`,
          dataToSending: {
            firstName: RegisterDatas.fName,
            lastName: RegisterDatas.lName,
            email: RegisterDatas.email,
            password: RegisterDatas.password,
          },
          handleError: () => null,
          handleSuccess: () => console.log('New code Sending'),
        });
        break;
      }

      case 'Forgot': {
        console.log(NewPwdData);
        useForgotFetchingQuerryResendCode.mutate({
          ApiLink: `${Api.LINK}`,
          EndPoint: `${Api.FORGOT_PWD}`,
          methode: 'POST',
          dataToSending: { email: NewPwdData.email },
          handleError: handleErrorFeching,
          handleSuccess: () => console.log('New code sending'),
        });
        break;
      }
    }
  };

  const handleOTPValue = (valueChanged: string) => {
    switch (FromScreen) {
      case 'SignUp': {
        setActiveAccountData({
          ...ActiveAccountData,
          code: valueChanged,
        });
        break;
      }
      case 'Forgot': {
        setNewPwdData({
          ...NewPwdData,
          code: valueChanged,
        });
        break;
      }
    }
  };

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
              <p className="SubTitle">
                Verifiez votre boite mail, Un code vous a été envoyé
              </p>
            </div>
            <div className="InputsContainer">
              <OtpInput
                numInputs={6}
                onChange={handleOTPValue}
                containerStyle={OtpStyle.Container}
                inputStyle={OtpStyle.Input}
                focusStyle={OtpStyle.FocusedInput}
                shouldAutoFocus={true}
              />
            </div>
            <div className="ResendCodeContainer">
              <span className="ResendCallToAction">Code non reçu?</span>
              <span className="ResendBlocBtn" onClick={GetNewCode}>
                Renvoyez le code
              </span>
              <>
                {(useFetchingMutation.isLoading ||
                  useForgotFetchingQuerryResendCode.isLoading) && (
                  <div className="sendDatasLoading"></div>
                )}
              </>
            </div>
            <ButtonForm
              label="Envoyer"
              OnPressAction={handleClik}
              disabled={
                (ActiveAccountData.code == '' && NewPwdData.code == '') ||
                (ActiveAccountData.code.length < 6 &&
                  NewPwdData.code.length < 6)
              }
              loading={useSendCode.isLoading}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default OtpVerify;
