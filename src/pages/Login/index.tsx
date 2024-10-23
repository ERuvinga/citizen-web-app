import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//states and Recoil functions
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  // DatasOfUserLogin,
  errorLogRegisterForm,
  LoginDataStore,
  MsgServerState,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//Customs Hooks
import useToken, { Token } from '@/hooks/useToken';
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';
import { useMutate } from '@/hooks/useFetch';

// components
import BackHomeBtn from '@/Components/BackHome';
import ButtonForm from '@/Components/BtnForm';
import HeadDatas from '@/Components/Header';
import InputField from '@/Components/InputField';
import ToastComponent from '@/Components/Toast';

//Constants
import { LoginTabFieldDatas } from '@/Constants/TabListDatas';
import { MessageServerType } from '@/Constants/Type';

const Login = () => {
  // states
  const LoginDatasValue = useRecoilValue(LoginDataStore);
  //const setLoginUserDatas = useSetRecoilState(DatasOfUserLogin);
  const Api = useRecoilValue(API);
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [MyToken, setMyToken] = useState({} as Token);

  //States Errors Servers
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);

  //Reset States
  const SetResetLogDatas = useResetRecoilState(LoginDataStore);
  const SetResetErrosField = useResetRecoilState(errorLogRegisterForm);
  const SetResetMsgOfServerStates = useResetRecoilState(MsgServerState);

  //Input Field Errors States
  const LoginErrors = useRecoilValue(errorLogRegisterForm);

  //hooks To fetching datas
  const useFetchingMutation = useMutate();
  const navigation = useRouter();

  //HANDLES, manage response after request to Api
  const ResetAllState = () => {
    // Resets All States
    SetResetLogDatas();
    SetResetErrosField();
    SetResetMsgOfServerStates();
  };

  useEffect(() => {
    ResetAllState();
    setStorage(useLocalStorage);
    setMyToken(useToken);
  }, []);

  //Handles manager Login datas
  const Login = (NewToken: string) => {
    // update token
    MyToken.LogIn(NewToken); // save in Secure store a new User token

    //Go To Authentification Home
    navigation.push('/Auth/Home');
    console.log('Login User');

    //Local storage datas
    console.log(Storage.getAllDatas());
    console.log(MyToken.getToken());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingError = (ErrorDatas: any) => {
    //Error Global State Chaged to True
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: ErrorDatas.response.data.message,
      messageType: MessageServerType.ERROR,
    });
    console.log(ErrorDatas.response.data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingSuccess = (successDatas: any) => {
    // const OwnerUser: UserData = successDatas.user;
    SetServerMessageDisplay({
      // Display Message Of Server
      hidden: false,
      message: successDatas.message,
      messageType: MessageServerType.SUCCESS,
    });

    // Reset States in App
    console.log(successDatas);
    ResetAllState();
    Login(successDatas.token); // to deleting whene adding Upadted datas user

    // if (
    //   !OwnerUser.Province ||
    //   !OwnerUser.Sexe ||
    //   !OwnerUser.Telephone ||
    //   !OwnerUser.birthYear ||
    //   !OwnerUser.AccountType ||
    //   !OwnerUser.imageProfile ||
    //   !OwnerUser.status
    // ) {
    //   console.log('New User datas');
    //   setLoginUserDatas({
    //     token: successDatas.token,
    //     name: `${OwnerUser.firstName} ${OwnerUser.lastName}`,
    //     image: OwnerUser.imageProfile ? OwnerUser.imageProfile : '',
    //     email: OwnerUser.email,
    //   });

    //   navigation.push('/UpdateUserDatas');
    // } else {
    //   console.log('available remote datas');
    //     console.log('Storage datas in Local...');
    //     Storage.setAllDatas({
    //       email: OwnerUser.email,
    //       fName: OwnerUser.firstName,
    //       lName: OwnerUser.lastName,
    //       Province: OwnerUser.Province,
    //       City: OwnerUser.Ville,
    //       Gender: OwnerUser.Sexe,
    //       Phone: OwnerUser.Telephone,
    //       Status: OwnerUser.status,
    //       ImageProfile: OwnerUser.imageProfile,
    //       DocumentAuthority: OwnerUser.document ? OwnerUser.document : ' ',
    //       BirthYear: OwnerUser.birthYear,
    //       AccountType: OwnerUser.AccountType,
    //       idUser: OwnerUser._id,
    //     });
    //   Login(successDatas.token);
    // }
  };

  //send Data function
  const SingInClick = () => {
    console.log(LoginDatasValue);

    //sending Datas
    useFetchingMutation.mutate({
      //Login
      methode: 'POST',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.SIGN_IN}`,
      dataToSending: LoginDatasValue,
      handleError: handleFecthingError,
      handleSuccess: handleFecthingSuccess,
    });
  };

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
              <Image
                width={170}
                height={55}
                alt="logo"
                src={'/logo.png'}
                placeholder="blur"
                blurDataURL="/Wshimer.svg"
                className="logo"
              />
              <h1 className="PageTitle">Bienvenu-Karibu</h1>
            </div>
            <div className="InputsContainer">
              <>
                {LoginTabFieldDatas.map((value, index) => (
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
              label="Connexion"
              OnPressAction={SingInClick}
              disabled={
                LoginErrors.LoginInvalidEmail ||
                LoginDatasValue.email == '' ||
                LoginDatasValue.password == ''
              }
              loading={useFetchingMutation.isLoading}
            />
            <div className="OtherLinks">
              <Link className="pswdForgot" href={'/VerifyEmail'}>
                Mot de passe oublié ?
              </Link>
              <div className="otherPageLink">
                <span>Nouveau dans la communauté ?</span>
                <Link href={'/Register'}>Créer un compte</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Login;
