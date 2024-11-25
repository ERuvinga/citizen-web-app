import { useEffect } from 'react';
import HeadDatas from '../Components/Header';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// Components
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/Components/NavBar';
import Shape from '@/Components/decoShapes';
import ToolCard from '@/Components/ToolsCard';

//States atoms
import { cardActionsData } from '@/state/HomeDatas';
import { itemSelected } from '@/state/NavDatas';

export default function Home() {
  //states
  const Actions = useRecoilValue(cardActionsData);
  const setItemSelectedValue = useSetRecoilState(itemSelected);

  useEffect(() => {
    setItemSelectedValue(0); // init Selected item in navBar
  }, []);

  return (
    <>
      <HeadDatas
        title="Citizen Voice Lab"
        description="Consolider la gouvernance démocratique par une participation civique innovante à travers le numérique"
      />

      <NavBar />
      <div className="HomePage">
        <div className="WelcomeMsg">
          <div className="shapeIllustration"></div>
          <div className="wideSquare">
            <Shape wide={true} shape="circle" />
          </div>
          <div className=" TextWelcm">
            <div className="wideCircle">
              <Shape wide={false} shape="circle" />
            </div>
            <span className="TitlePage">
              Bienvenue sur la platforme des Citoyens.
            </span>
            <span className="presentationPage">
              Citizen Voice Lab, Consolide la gouvernance démocratique par une
              participation civique innovante à travers le numérique
            </span>
            <div className="Links">
              <Link href={'/Login'} className="RegisterLink">
                COMMENCER
              </Link>
            </div>
          </div>
        </div>
        <div className="ContainerActionsCard">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Actions.map((value: any, index: number) => (
              <ToolCard
                key={`${value.NameTool}_${index}`}
                Icone={value.Icone}
                DescriptionTool={value.DescriptionTool}
                NameTool={value.NameTool}
                linkToTool={value.linkToTool}
              />
            ))
          }
        </div>
        <section className="roleBloc ">
          <section className="WorkingSpace">
            <div className="illustr_bloc">
              <Image
                width={150}
                height={150}
                alt="illustretion Web"
                src={'/illustrations/groupes.svg'}
                placeholder="blur"
                blurDataURL="/Wshimer.svg"
              />
              <aside className="text_descr">
                <span className="titleCard">Une communauté d&apos;echange</span>
                <p>
                  une organisation de droit congolais légalement enregistrée au
                  ministère national de la justice sous le numéro F.92/51.285,
                  s&apos;engage à protéger la vie privée de ses utilisateurs.
                  Cette politique de confidential
                </p>
              </aside>
            </div>
          </section>
        </section>
      </div>
      <div className="About" id="About">
        <div className="TitleAbout">
          <span>A propos</span>
          <div>
            Citizen Voice Lab, une plateforme virtuelle gérée par JAMAA Grands
            Lacs, une organisation de droit congolais légalement enregistrée au
            ministère national de la justice sous le numéro F.92/51.285,
            s&apos;engage à protéger la vie privée de ses utilisateurs. Cette
            politique de confidentialité décrit comment nous collectons,
            utilisons, partageons et protégeons les informations personnelles
            que vous nous fournissez lorsque vous utilisez notre application
            Civic Tech.
          </div>
        </div>
      </div>
      <div className="DownLoad">
        <div className="BlocNews">
          <div className="NewsText">
            <span className="titleBlocNews">Téléchargement </span>
            <p>Télécharger la version mobile</p>
            <div className="ApplicationsButtons ">
              <Link href={'#'} className="button">
                <img alt={`Play store image`} src={`/Icones/playStore.svg`} />
                Play store
              </Link>
              <Link href={'#'} className="button">
                <img alt={`Apple store image`} src={`/Icones/AppleStore.svg`} />
                Apple store
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="footPage">
        Copyright © 2024 Jamaa Grand Lac. All Rights Reserved.
      </footer>
    </>
  );
}
