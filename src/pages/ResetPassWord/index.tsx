import { useRouter } from 'next/navigation';

//states and Recoil functions
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
  SuccessMsg,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//Customs Hooks
import { useMutate } from '@/hooks/useFetch';

// components
import BackHomeBtn from '@/Components/BackHome';
import ButtonForm from '@/Components/BtnForm';
import HeadDatas from '@/Components/Header';
import InputField from '@/Components/InputField';
import ToastComponent from '@/Components/Toast';

//Constants
import { ResetTabValues } from '@/Constants/TabListDatas';
import { MessageServerType } from '@/Constants/Type';
import { useEffect } from 'react';

const ResetPassWord = () => {
  // states
  const [ForgotDatas, setForgotDatas] = useRecoilState(ForgotPwdDatas);
  const SetSuccessMessage = useSetRecoilState(SuccessMsg);
  const ErrorDatas = useRecoilValue(errorLogRegisterForm);
  const Api = useRecoilValue(API);

  //server messages
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  const SetResetForgotDatas = useResetRecoilState(ForgotPwdDatas);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);
  //hooks To fetching datas
  const useFetchToResetPassword = useMutate();
  const navigation = useRouter();

  const ResetAllState = () => {
    // Resets All States
    SetResetForgotDatas();
    SetResetMsgOfServerStates();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = () => {
    SetServerMessageDisplay({
      hidden: false,
      message: 'Action failed, unable to change password',
      messageType: MessageServerType.ERROR,
    });
  };

  const handleFecthingSuccess = () => {
    //Reset datas
    ResetAllState();
    //display message to use
    SetSuccessMessage({
      message: 'Mot de pass Réinitialisé avec Succès',
    });
    navigation.replace('/SuccessActions');
  };

  // send Data function
  const handleClik = () => {
    console.log(ForgotDatas);
    useFetchToResetPassword.mutate({
      methode: 'POST',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.RESET_PWD}`,
      dataToSending: {
        resetToken: ForgotDatas.code,
        password: ForgotDatas.newPassword,
      },
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };

  useEffect(() => {
    if (ForgotDatas.newPassword.length || ForgotDatas.confirmPassWord.length) {
      setForgotDatas((lastValue) => ({
        ...lastValue,
        newPassword: '',
        confirmPassWord: '',
      }));
    }
  }, []);

  return (
    <>
      <HeadDatas
        title="Citizen Voice Lab, Connectez- vous"
        description="Connectez-vous Et rejoignez une Communauté d'echange "
      />
      <ToastComponent />
      <main className="LoginPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <BackHomeBtn />
            <div className="TilteForm">
              <h1 className="PageTitle">Nouveau mot de pass</h1>
            </div>
            <div className="InputsContainer">
              <>
                {ResetTabValues.map((value, index) => (
                  <InputField
                    placehold={value.placeholder}
                    label={value.label}
                    fromPage={value.from}
                    type={value.type}
                    key={`${index}_${value.id}`}
                    idField={index}
                    secure={value.secure}
                    checked={value.checked}
                    ErrorType={value.errorType}
                  />
                ))}
              </>
            </div>
            <ButtonForm
              label="Envoyer"
              OnPressAction={handleClik}
              disabled={
                ErrorDatas.RegisterInvalidStrongPswd ||
                ErrorDatas.pswdAndCofirmResetPswd ||
                ForgotDatas.newPassword == '' ||
                ForgotDatas.confirmPassWord == ''
              }
              loading={useFetchToResetPassword.isLoading}
            />
          </div>
        </section>
      </main>
    </>
  );
};
export default ResetPassWord;
