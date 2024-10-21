import { useEffect } from 'react';

// atoms
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataUser } from '@/state/user';
import { itemSelected } from '@/state/NavDatas';
import { DatasOfUserLogin } from '@/state/SignInUpDatas';

//components
import Loading from '@/Components/Loading';
import HeadDatas from '@/Components/Header';
import NavBar from '@/Components/NavBar';

export default function AboutPage() {
  const datasOfUser = useRecoilValue(dataUser);
  const setItemSelected = useSetRecoilState(itemSelected);
  const userDatasLogin = useRecoilValue(DatasOfUserLogin);

  useEffect(() => {
    setItemSelected(3);
    console.log(userDatasLogin);
  }, []);
  return (
    <>
      <HeadDatas
        title="veuilleurduwebrdc"
        description="Un programme de l'UNICEF pour la lutte contre les fausses informations et les dicours de haine sur internet"
      />
      <section className="">
        <NavBar />
        <Loading hiddenText={false} contenteText={datasOfUser} />
      </section>
    </>
  );
}
