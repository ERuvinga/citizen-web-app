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
    data: 'password',
  },
];

const Login = () => {
  // states
  const setItemSelected = useSetRecoilState(itemSelected);

  useEffect(() => {
    setItemSelected(10);
  }, []);

  return (
    <>
      <HeadDatas
        title="Login"
        description="Connectez-vous pour plus d'interactivité sur la platforme"
      />
      <div className="logRegNav">
        <NavBar />
      </div>
      <main className="LoginPage">
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
            src={'/illustrations/LoginIllustration.svg'}
            width={0}
            height={0}
            className="logRegIllustration"
            alt="Illustration Login and Register pages"
            placeholder="blur"
            blurDataURL="/Shimer.svg"
          />
          <div className="footIllustr">
            <span className="footTitle">Connectez-vous à votre Compte</span>
            <span className="footDescr">
              Et réjoignez une équipe des jeunes, luttant contre les fausses
              informations sur le web
            </span>
          </div>
        </section>
        <section className="formulaire">
          <div className="ContainerForm">
            <BackHomeBtn />
            <div className="TilteForm">
              <h1 className="PageTitle">Connexion au compte</h1>
              <span className="PageDesc">
                Saisissez vos donnees de connexion
              </span>
            </div>
            <div className="InputsContainer">
              <>
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
              </>
              <div className="pswdForgot">
                <div>
                  <input className="chekbox" type="checkbox" name="remember" />
                  <span>se souvenir de moi</span>
                </div>
                <Link href={'#'}>Mot de passe oublié ?</Link>
              </div>
            </div>
            <ButtonForm label="Connexion" Origin="Login" />
            <LineComponent TextLine="Ou connectez" />
            <div className="containerAuthBtns">
              <AuthBtn nameofBtn="Google" origin="Login" />
              <AuthBtn nameofBtn="Facebook" origin="Login" />
            </div>
            <div className="otherPageLink">
              <span>vous n`avez pas de compte ?</span>
              <Link href={'/Register'}>Créer</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Login;
