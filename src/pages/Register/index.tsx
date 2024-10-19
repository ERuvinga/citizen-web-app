import ButtonForm from '@/Components/BtnForm';
import AuthBtn from '@/Components/GoogleFaceBkAOuthBtn';
import HeadDatas from '@/Components/Header';
import InputField from '@/Components/InputField';
import LineComponent from '@/Components/Line';
import Image from 'next/image';
import Link from 'next/link';

// import image
import LoadingImage from '../../../public/favicon.png';
import BackHomeBtn from '@/Components/BackHome';
import NavBar from '@/Components/NavBar';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { itemSelected } from '@/state/NavDatas';

// variables
const fieldDatas = [
  {
    data: 'email',
  },
  {
    data: 'name',
  },
  {
    data: 'password',
  },
];

const RegisterPage = () => {
  // states
  const setItemSelected = useSetRecoilState(itemSelected);

  useEffect(() => {
    setItemSelected(10);
  }, []);

  return (
    <>
      <HeadDatas
        title="Register"
        description="Créer un compte et rejoins-nous, ensemble pour un web positif"
      />
      <div className="logRegNav">
        <NavBar />
      </div>
      <main className="RegisterPage">
        <section className="Illustration">
          <Image
            className="logo"
            src={LoadingImage}
            alt="veuilleurduWebLogo"
            width={0}
            height={0}
            quality={100}
            placeholder="blur"
          />
          <Image
            src={'/illustrations/GrupJoinRegisterIllustration.svg'}
            width={0}
            height={0}
            className="logRegIllustration"
            alt="Illustration Login and Register pages"
            placeholder="blur"
            blurDataURL="/Shimer.svg"
          />
          <div className="footIllustr">
            <span className="footTitle">
              Créer votre Compte pour nous réjoindre
            </span>
            <span className="footDescr">
              Une équipe des jeunes, luttant contre les fausses informations sur
              le web
            </span>
          </div>
        </section>
        <section className="formulaire">
          <div className=" ContainerForm">
            <BackHomeBtn />
            <div className="TilteForm">
              <h1 className="PageTitle">Création de compte</h1>
              <span className="PageDesc">Saisissez les donnees demandées</span>
            </div>
            <div className="InputsContainer">
              {fieldDatas.map((value, index) => (
                <InputField
                  placehold={value.data}
                  label={value.data}
                  fromPage="Login"
                  type={value.data}
                  key={`${index}_${value.data}`}
                  idField={index}
                />
              ))}
            </div>
            <ButtonForm label="Suivant" Origin="Register" />
            <LineComponent TextLine="Ou créer avec" />
            <div className="containerAuthBtns">
              <AuthBtn nameofBtn="Google" origin="Register" />
              <AuthBtn nameofBtn="Facebook" origin="Register" />
            </div>
            <div className="otherPageLink">
              <span>vous avez déja un compte ?</span>
              <Link href={'/Login'}>Connectez-vous</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
