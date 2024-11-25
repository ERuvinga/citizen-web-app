import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// atoms and states
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  CompleteRegisterDataStore,
  DatasOfUserLogin,
  errorLogRegisterForm,
  MsgServerState,
} from '@/state/SignInUpDatas';
import { API } from '@/state/Api';

//Customs Hooks
import { useMutateWithToken } from '@/hooks/useFetch';
import useToken, { Token } from '@/hooks/useToken';
import useLocalStorage, { LocalStorage } from '@/hooks/UselocalDatas';

//components
import HeadDatas from '@/Components/Header';
import SelectInputField from '@/Components/SelectedComponent';
import ButtonForm from '@/Components/BtnForm';
import { DocumentCheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import ToastComponent from '@/Components/Toast';

//Types and Const
import {
  DropdownType,
  MessageServerType,
  UserData,
  UserRole,
} from '@/Constants/Type';
import Image from 'next/image';
import InputField from '@/Components/InputField';
import { ConfigurationAccountTaabValue } from '@/Constants/TabListDatas';

const UpdateUserDatasPage = () => {
  //states
  const [Storage, setStorage] = useState({} as LocalStorage);
  const [MyToken, setMyToken] = useState({} as Token);
  const navigation = useRouter();

  //files datas
  const [ProfileImageDatas, setProfileImageDatas] = useState({} as File);
  const [AuthorityDocFileDatas, setAuthorityDocFileDatas] = useState(
    {} as File
  );
  const [urlToImage, setUrlToImage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileinputFile, setProfileinputFile]: any = useState(<></>); // input file element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [AuthorityDocInputFile, setAuthorityDocInputFile]: any = useState(
    <></>
  ); // input file element
  //Atoms
  const UserDatas = useRecoilValue(DatasOfUserLogin);
  const SetServerMessageDisplay = useSetRecoilState(MsgServerState);
  const [ConfigurationAccountDatas, setConfigurationAccountDatas] =
    useRecoilState(CompleteRegisterDataStore);
  const ResetConfigDatas = useResetRecoilState(CompleteRegisterDataStore);
  const Api = useRecoilValue(API);
  const ErrorDatas = useRecoilValue(errorLogRegisterForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStorage(useLocalStorage);
    setMyToken(useToken);
    setProfileinputFile(document.querySelector('#ProfileInputFile'));
    setAuthorityDocInputFile(document.querySelector('#AuthorityDocInputFile'));

    // Checking if User is Login or Logout
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (useToken().LogInState().isLogin) {
      console.log('User Login');
    } else {
      if (!UserDatas.token) {
        console.log('User Logout');
        navigation.replace('/Login');
      }
    }
  }, []);

  //Querries
  //hooks To fetching datas
  const useFetchingMutation = useMutateWithToken();

  //Tab datas
  // 1. Province
  const ProvincesTab = [
    {
      label: 'Default',
      value: 'Nord-Kivu',
    },
    {
      label: 'Nord-Kivu',
      value: 'Nord-Kivu',
    },
  ];

  // 2. city
  const CitiesTab = [
    {
      label: 'Default',
      value: 'Goma',
    },
    {
      label: 'Goma',
      value: 'Goma',
    },
  ];

  // 3. gender
  const GendersTab = [
    {
      label: 'Default',
      value: 'M',
    },
    {
      label: 'Homme',
      value: 'M',
    },
    {
      label: 'Femme',
      value: 'F',
    },
  ];

  // 4. Account Tab
  const AccountTab = [
    {
      label: 'Default',
      value: UserRole.CITIZEN,
    },
    {
      label: 'Citoyen',
      value: UserRole.CITIZEN,
    },
    {
      label: 'Autorité',
      value: UserRole.AUTHORITY,
    },
  ];

  // 5. DropDown Tab
  const DropDownTab = [
    {
      //Provinces
      label: 'Provinces',
      placeholder: 'Nord-Kivu',
      Form: DropdownType.PROVINCE,
      Tab: ProvincesTab,
      selected: ConfigurationAccountDatas.Province,
      id: 0,
    },
    {
      //City
      label: 'Ville',
      placeholder: 'Goma',
      Form: DropdownType.CITY,
      Tab: CitiesTab,
      selected: ConfigurationAccountDatas.Ville,
      id: 1,
    },
    {
      //Gender
      label: 'Genre',
      placeholder: '~',
      Form: DropdownType.GENDER,
      Tab: GendersTab,
      selected: ConfigurationAccountDatas.Sexe,
      id: 2,
    },
    {
      //Account Type
      label: 'Type de compte',
      placeholder: 'Citoyen',
      Form: DropdownType.ACCOUNTTYPE,
      Tab: AccountTab,
      selected: ConfigurationAccountDatas.AccountType,
      id: 3,
    },
  ];

  // Get Image of Profile
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ProfilefileChanged = (event: any) => {
    //create url Objet
    if (event.target.files && event.target.files.length > 0) {
      const objUrl = window.URL.createObjectURL(event.target.files[0]);
      setUrlToImage(objUrl);
      setProfileImageDatas(event.target.files[0]);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthorityfileChanged = (event: any) => {
    //create url Objet
    if (event.target.files && event.target.files.length > 0) {
      setAuthorityDocFileDatas(event.target.files[0]);
    }
  };

  const resetStateOFiles = () => {
    profileinputFile.value = '';
    AuthorityDocInputFile.value = '';
    setAuthorityDocFileDatas({} as File);
    setProfileImageDatas({} as File);
    setUrlToImage('');
    ResetConfigDatas();
  };

  const Login = (OwnerUser: UserData, NewToken: string) => {
    Storage.setAllDatas({
      email: OwnerUser.email,
      fName: OwnerUser.firstName,
      lName: OwnerUser.lastName,
      Province: OwnerUser.Province,
      City: OwnerUser.Ville,
      Gender: OwnerUser.Sexe,
      Phone: OwnerUser.Telephone,
      Status: OwnerUser.status,
      ImageProfile: OwnerUser.imageProfile,
      DocumentAuthority: OwnerUser.document ? OwnerUser.document : '',
      BirthYear: OwnerUser.birthYear,
      AccountType: OwnerUser.AccountType,
      idUser: OwnerUser._id,
    });

    MyToken.LogIn(NewToken); // save in Secure store a new User token
    resetStateOFiles();
    setLoading(false);
    navigation.replace('/Auth/Home'); // Go to Auth page
  };

  //Querries Functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthingSuccess = (successDatas: any) => {
    console.log('Login Success');
    console.log(successDatas);

    const OwnerUser: UserData = successDatas.user;

    //Login
    Login(OwnerUser, UserDatas.token);
  };
  const SendDatas = (profileImage: string, documentFile: null | string) => {
    const DatasToUpdated = {
      imageProfile: profileImage,
      Province: ConfigurationAccountDatas.Province,
      Sexe: ConfigurationAccountDatas.Sexe,
      birthYear: ConfigurationAccountDatas.birthYear,
      AccountType: ConfigurationAccountDatas.AccountType,
      Ville: ConfigurationAccountDatas.Ville,
      Telephone: ConfigurationAccountDatas.Telephone,
      document: documentFile,
    };

    useFetchingMutation.mutate({
      //Login
      methode: 'PATCH',
      ApiLink: `${Api.LINK}`,
      EndPoint: `${Api.UPDATE_USER}`,
      dataToSending: DatasToUpdated,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleError: (error: any) => console.log(error.response),
      handleSuccess: handleFecthingSuccess,
      Authorization: UserDatas.token,
    });
  };

  // iMAGE fUNCTIONS
  const PictureHandle = () => {
    console.log('Profile Image Selection');
    profileinputFile.click();
  };

  const PictureHandleAuthorityFile = () => {
    console.log('Doc user image selection');
    AuthorityDocInputFile.click();
  };

  const uploadImage = async (Picture: File) => {
    const ImageForm = new FormData();

    ImageForm.append('image', Picture);

    //Fetch Image
    const Result = await fetch(`${Api.LINK}${Api.UPLOAD_IMAGE}`, {
      method: 'POST',
      body: ImageForm,
    });

    const datas = await Result.json();
    return datas.imageUrl;
  };

  const CreateImageUser = async () => {
    console.log('Image Profile Created');

    console.log(ConfigurationAccountDatas);
    if (ProfileImageDatas.name) {
      setLoading(true);
      const imageUser = await uploadImage(ProfileImageDatas);
      console.log('user datas');
      console.log(imageUser);
      // save Image Profile
      setConfigurationAccountDatas((lastValue) => ({
        ...lastValue,
        imageProfile: imageUser,
      }));

      //upload Image of Document
      if (ConfigurationAccountDatas.AccountType == UserRole.AUTHORITY) {
        CreateImageAuthorityDoc(imageUser);
      } else {
        // else Sending datas
        SendDatas(imageUser, null);
      }
    }
  };

  const CreateImageAuthorityDoc = async (profileImage: string) => {
    if (AuthorityDocFileDatas.name) {
      const imageDoc = await uploadImage(AuthorityDocFileDatas);
      console.log('Document Authority Created');
      console.log(imageDoc);
      setConfigurationAccountDatas((lastValue) => ({
        ...lastValue,
        document: imageDoc,
      }));

      // sending datas
      SendDatas(profileImage, imageDoc);
    }
  };

  return (
    <>
      <HeadDatas
        title="Citizen voice Lab"
        description="Mise a jour des donnees utilisateur"
      />
      <ToastComponent />
      <main className="UpdatingDataPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <span className="TitlePage">
              Terminer la configuration du compte
            </span>

            <div className="UserDatasHeader">
              <div className="ImageContainer">
                <input
                  type="file"
                  className="fileInput"
                  onChange={ProfilefileChanged}
                  id="ProfileInputFile"
                  accept="image/*"
                />
                <Image
                  width={90}
                  height={90}
                  alt="logo"
                  src={urlToImage ? urlToImage : '/Placeholders/profile.png'}
                  placeholder="blur"
                  blurDataURL="/Wshimer.svg"
                  className={
                    !urlToImage ? 'ProfileImage' : 'RounderProfileImage'
                  }
                />
                <div className="PlusIcone" onClick={PictureHandle}>
                  <PlusIcon width={20} height={20} color="#f5f5f4" />
                </div>
              </div>

              <span className="name">{UserDatas.name}</span>
              <span className="email">{UserDatas.email}</span>
            </div>
            <div className="InputsContainer">
              <>
                {ConfigurationAccountTaabValue.map((value, index) => (
                  <InputField
                    placehold={value.placeholder}
                    label={value.label}
                    fromPage={value.from}
                    type={value.type}
                    key={`${index}_${value.id}`}
                    idField={value.id}
                    secure={value.secure}
                    checked={value.checked}
                    ErrorType={value.errorType}
                  />
                ))}
              </>
              <>
                {DropDownTab.map((value, id) => (
                  <SelectInputField
                    key={`${value.label}_${id}`}
                    label={value.label}
                    placehold={value.placeholder}
                    Options={value.Tab}
                    id={value.id}
                  />
                ))}
              </>
              <>
                <input
                  type="file"
                  className="fileInput"
                  onChange={AuthorityfileChanged}
                  id="AuthorityDocInputFile"
                  accept="image/*"
                />
                {ConfigurationAccountDatas.AccountType ==
                  UserRole.AUTHORITY && (
                  <div
                    className="AuthorityDocContainer"
                    onClick={PictureHandleAuthorityFile}
                  >
                    <>
                      {AuthorityDocFileDatas.name ? (
                        <>
                          <DocumentCheckIcon width={20} color="#64748b" />
                          <span>{AuthorityDocFileDatas.name}</span>
                        </>
                      ) : (
                        <>
                          <CloudArrowDownIcon width={20} color="#64748b" />
                          <span>selectionner le document</span>
                        </>
                      )}
                    </>
                  </div>
                )}
              </>
            </div>

            <ButtonForm
              label="Envoyer"
              OnPressAction={() => {
                if (ProfileImageDatas.name) {
                  CreateImageUser();
                } else {
                  SetServerMessageDisplay({
                    // Display Message Of Server
                    hidden: false,
                    message: "Complétez l'image de profile",
                    messageType: MessageServerType.ERROR,
                  });
                }
              }}
              disabled={
                !ConfigurationAccountDatas.Telephone.length ||
                ErrorDatas.invalidPhoneNumber ||
                ErrorDatas.invalidBirthDay ||
                ConfigurationAccountDatas.birthYear == '' ||
                ConfigurationAccountDatas.Province == '' ||
                ConfigurationAccountDatas.Ville == '' ||
                ConfigurationAccountDatas.Sexe == '' ||
                ConfigurationAccountDatas.AccountType == '' ||
                (ConfigurationAccountDatas.AccountType == UserRole.AUTHORITY &&
                  (AuthorityDocFileDatas.name ? false : true)) ||
                loading
              }
              loading={loading}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default UpdateUserDatasPage;
