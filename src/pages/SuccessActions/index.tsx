import Image from 'next/image';
import { useRouter } from 'next/navigation';

//Atoms and Recoil
import { useRecoilValue } from 'recoil';
import { SuccessMsg } from '@/state/SignInUpDatas';

// components
import ButtonForm from '@/Components/BtnForm';
import HeadDatas from '@/Components/Header';

const SuccessActions = () => {
  const navigation = useRouter();
  //state
  const SuccesMessage = useRecoilValue(SuccessMsg);
  return (
    <>
      <HeadDatas
        title="Action Success"
        description="SuccessFull actions, Connectez-vous"
      />
      <main className="SuccessPage">
        <section className="formulaire">
          <div className="ContainerForm">
            <div className="TilteForm TextTilteForm">
              <Image
                width={300}
                height={300}
                alt="success"
                src={'/illustrations/success.png'}
                placeholder="blur"
                blurDataURL="/Wshimer.svg"
                className="successAction"
              />
              <h1 className="PageTitle">Successful!</h1>
              <p className="SubTitle">{SuccesMessage.message}</p>
            </div>

            <ButtonForm
              label="Connectez-vous"
              OnPressAction={() => navigation.replace('/Login')}
              disabled={false}
              loading={false}
            />
          </div>
        </section>
      </main>
    </>
  );
};
export default SuccessActions;
