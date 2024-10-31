// Next datas
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Customs Hooks
import { useMutate } from '@/hooks/useFetch';

//components
import HeadDatas from '@/Components/Header';
import ButtonForm from '@/Components/BtnForm';
import InputField from '@/Components/InputField';
import ToastComponent from '@/Components/Toast';
import BackHomeBtn from '@/Components/BackHome';

//states datas
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { API } from '@/state/Api';
import {
  ActiveAccountDatas,
  errorLogRegisterForm,
  MsgServerState,
  OTPFromScreen,
  RegisterDataStore,
} from '@/state/SignInUpDatas';

//Types datas
import { MessageServerType } from '@/Constants/Type';
import { RegTabValue } from '@/Constants/TabListDatas';

const RegisterPage = () => {
  //states
  const RegisterDatas = useRecoilValue(RegisterDataStore);
  const FromScreen = useSetRecoilState(OTPFromScreen);
  const Api = useRecoilValue(API);
  const [AccountDatas, setAccountDatas] = useRecoilState(ActiveAccountDatas);
  const RegisterErrorsStates = useRecoilValue(errorLogRegisterForm);

  //Errors servers
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  //Reset States
  const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

  //hooks To fetching datas
  const useFetchingMutation = useMutate();
  const navigation = useRouter();

  //handle manage response after request to Api
  const ResetAllState = () => {
    // Resets All States
    SetResetErrosField();
    SetResetMsgOfServerStates();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = (Error: any) => {
    //Error Global State Chaged to True
    console.log(Error.response);
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: Error.response.data.message,
      messageType: MessageServerType.ERROR,
    });
  };

  const handleFecthingSuccess = () => {
    console.log('Requette reussie');

    ResetAllState(); // Reset All States
    //verification Code sending to mail and switch to register datas in Otp page
    setAccountDatas({
      ...AccountDatas,
      email: RegisterDatas.email,
    });
    FromScreen('SignUp');
    navigation.push('/OtpVerify');
  };

  // send Data function
  const handleRegister = () => {
    console.log(RegisterDatas);

    useFetchingMutation.mutate({
      // Regiter
      methode: 'POST',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.SIGN_UP}`,
      dataToSending: {
        firstName: RegisterDatas.fName,
        lastName: RegisterDatas.lName,
        email: RegisterDatas.email,
        password: RegisterDatas.password,
      },
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };
  return (
    <>
      <HeadDatas
        title="Citizen Voice Lab Création de compte"
        description="Creer votre compte et rejoignez une Communauté d'echange "
      />
      <ToastComponent />
      <main className="RegisterPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <BackHomeBtn />
            <div className="TilteForm">
              <Image
                width={170}
                height={55}
                alt="logo"
                src={'/logo.png'}
                placeholder="blur"
                blurDataURL="/Wshimer.svg"
                className="logo"
              />
              <h1 className="PageTitle">Création de compte</h1>
            </div>
            <div className="InputsContainer">
              <>
                {RegTabValue.map((value, index) => (
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
              label="Créer un compte"
              OnPressAction={handleRegister}
              disabled={
                RegisterErrorsStates.InvalidName ||
                RegisterErrorsStates.RegisterInvalidEmail ||
                RegisterErrorsStates.RegisterInvalidStrongPswd ||
                RegisterErrorsStates.pswdAndCofirmPswd ||
                RegisterDatas.email == '' ||
                RegisterDatas.fName == '' ||
                RegisterDatas.lName == '' ||
                RegisterDatas.password == '' ||
                RegisterDatas.confirmPassword == ''
              }
              loading={useFetchingMutation.isLoading}
            />
            <div className="OtherLinks">
              <div className="otherPageLink">
                <span>déja inscrit(e) ?</span>
                <Link href={'/Login'}>Connectez-vous</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
