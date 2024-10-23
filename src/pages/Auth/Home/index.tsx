import { useEffect } from 'react';
import HeadDatas from '@/Components/Header';
import Loading from '@/Components/Loading';

//Style
import AuthStyle from '@/pages/Auth/Home/Home.module.css';

const AuthHome = () => {
  //states

  useEffect(() => {
    console.log('Utilisateur Connecte');
  }, []);

  return (
    <>
      <HeadDatas
        title="Citizen Voice Lab"
        description="Consolider la gouvernance démocratique par une participation civique innovante à travers le numérique"
      />
      <div className={AuthStyle.Container}>
        <Loading
          hiddenText={false}
          contenteText="En cours de deployement, page pas Encore Disponible ..."
        />
      </div>
    </>
  );
};

export default AuthHome;
