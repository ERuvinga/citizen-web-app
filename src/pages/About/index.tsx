import { useEffect } from 'react';
import HeadDatas from '../../Components/Header';

// atoms
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataUser } from '@/state/user';
import Loading from '@/Components/Loading';
import NavBar from '@/Components/NavBar';
import { itemSelected } from '@/state/NavDatas';

export default function AboutPage() {
  const datasOfUser = useRecoilValue(dataUser);
  const setItemSelected = useSetRecoilState(itemSelected);

  useEffect(() => {
    setItemSelected(3);
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
