import { useEffect } from 'react';
import { useRouter } from 'next/router';

// atoms
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  errorLogRegisterForm,
  ForgotPwdDatas,
  MsgServerState,
  OTPFromScreen,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//customs Hooks
import { useMutate } from '@/hooks/useFetch';
import useEmail from '@/hooks/useEmail';

//components
import HeadDatas from '@/Components/Header';
import InputField from '@/Components/InputField';
import BackHomeBtn from '@/Components/BackHome';
import ButtonForm from '@/Components/BtnForm';
import ToastComponent from '@/Components/Toast';

//Constants
import { MessageServerType, ValidatesDatasErrors } from '@/Constants/Type';

const EmailVerify = () => {
  //states
  const FromScreen = useSetRecoilState(OTPFromScreen);
  const ForgotDatas = useRecoilValue(ForgotPwdDatas);
  const navigation = useRouter();
  const Api = useRecoilValue(API);
  const [valideDatasStates, setvalideDatasStates] =
    useRecoilState(errorLogRegisterForm);

  //Errors datas
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  //Reset States
  const SetResetForgotDatas = useResetRecoilState(ForgotPwdDatas);
  const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);
  // Handles, fetching => to send code via Email
  const ResetAllState = () => {
    // Resets All States
    SetResetForgotDatas();
    SetResetErrosField();
    SetResetMsgOfServerStates();
  };

  const ResetForgotStates = () => {
    SetResetMsgOfServerStates();
    SetResetErrosField();
  };

  const handleBackBtn = () => {
    // back button press manager Function
    ResetAllState(); // Reset Datas and Go Back
  };

  useEffect(() => {
    handleBackBtn();
  }, []);

  const CheckingEmail = (email: string) => {
    const useMail = useEmail(email);
    return useMail.isValid(); // return Boolean, true if email is valid and False if email is not valide
  };

  //HANDLES FOR RESPONSE API
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleErrorFeching = (error: any) => {
    SetServerMessageDisplay({
      hidden: false,
      message: error.response.data.error,
      messageType: MessageServerType.ERROR,
    });
    console.log(error.response.data);
  };

  const handleSuccess = () => {
    ResetForgotStates(); // Reset Errors Field
    // switch otp to forgotFetching
    FromScreen('Forgot');
    navigation.replace('/OtpVerify');
  };

  //hooks To fetching datas
  const forgotFetching = useMutate();

  // send Data function
  const SendEmail = () => {
    console.log(ForgotDatas);

    if (CheckingEmail(ForgotDatas.email)) {
      // if emai, user is Valid ,
      SetResetErrosField();
      //Seding Email
      forgotFetching.mutate({
        ApiLink: `${Api.LINK}`,
        EndPoint: `${Api.FORGOT_PWD}`,
        methode: 'POST',
        dataToSending: { email: ForgotDatas.email },
        handleError: handleErrorFeching,
        handleSuccess: handleSuccess,
      });
    } else {
      console.log('Invalid Email');
      setvalideDatasStates({
        ...valideDatasStates,
        ForgotInvalidEmail: true,
      });
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
              <h1 className="PageTitle">Verification du Compte</h1>
              <p className="SubTitle">Saisissez votre adresse email</p>
            </div>
            <div className="InputsContainer">
              <InputField
                placehold={'citizen@gmail.com'}
                label={'email'}
                fromPage={'ForgotPwd'}
                type={'email'}
                idField={2}
                secure={false}
                checked={true}
                ErrorType={ValidatesDatasErrors.FORGOTEMAIL}
              />

              <ButtonForm
                label="Envoyer"
                OnPressAction={SendEmail}
                disabled={ForgotDatas.email == ''}
                loading={forgotFetching.isLoading}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmailVerify;
