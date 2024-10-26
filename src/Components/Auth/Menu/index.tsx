//import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

//components
import {
  HomeIcon as OutlineHome,
  MagnifyingGlassIcon as SolidSearch,
  BellIcon as OutlineBell,
  UserIcon as OutlineUser,
  SquaresPlusIcon as OutlineSquarePlus,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as SolidHome,
  MagnifyingGlassIcon as OutlineSearch,
  BellIcon as SolidBell,
  UserIcon as SolidUser,
  ArrowLeftEndOnRectangleIcon,
  SquaresPlusIcon as SolidSquarePlusIcon,
} from '@heroicons/react/24/solid';

//Recoil and Atoms
import { useRecoilState } from 'recoil';
import { itemMenuSelected } from '@/state/MenuDatas';

//Types and styles
import Styles from '@/Components/Auth/Menu/Menu.module.css';
import { LocalUserData, NavBarIcons } from '@/Constants/Type';
import { MenuTab } from '@/Constants/TabListDatas';

interface MenuUserDatas {
  userDatas: LocalUserData;
}

const HomeMenu = (datas: MenuUserDatas) => {
  //const [MobileNaveDisplay, setMobileNaveDisplay] = useState(false);
  const [itemMenuSelctedValue, setitemMenuSelctedValue] =
    useRecoilState(itemMenuSelected);

  //updated itemSelected function
  const itemUpdated = (itemValue: number) => {
    setitemMenuSelctedValue(itemValue);
    // resets States
  };

  const DecodeIcone = (IconeCode: NavBarIcons, idItem: number) => {
    switch (IconeCode) {
      case NavBarIcons.Home: {
        return itemMenuSelctedValue == idItem ? (
          <SolidHome width={25} height={25} color="#00277f" />
        ) : (
          <OutlineHome width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.Search: {
        return itemMenuSelctedValue == idItem ? (
          <SolidSearch width={25} height={25} color="#00277f" />
        ) : (
          <OutlineSearch width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.Notif: {
        return itemMenuSelctedValue == idItem ? (
          <SolidBell width={25} height={25} color="#00277f" />
        ) : (
          <OutlineBell width={25} height={25} color="#7a7979" />
        );
      }
      case NavBarIcons.Profil: {
        return itemMenuSelctedValue == idItem ? (
          <SolidUser width={25} height={25} color="#00277f" />
        ) : (
          <OutlineUser width={25} height={25} color="#7a7979" />
        );
      }
    }
  };

  return (
    <div className={`${Styles.ContainerMenu}`}>
      <section className={`${Styles.BetwenneContainer}`}>
        <div className={`${Styles.AuthUserDatas}`}>
          <Image
            className={Styles.MenuProfileImage}
            src={
              datas.userDatas.imageProfile
                ? datas.userDatas.imageProfile
                : '/Placeholders/profile.png'
            }
            width={500}
            height={500}
            alt="profilImage"
          />
          <div className={`${Styles.EmailAndName}`}>
            <span
              className={`${Styles.Name}`}
            >{`${datas.userDatas.firstName} ${datas.userDatas.lastName}`}</span>
            <span className={`${Styles.Email}`}>{datas.userDatas.email}</span>
          </div>
        </div>
        <div className={`${Styles.MenuList}`}>
          {MenuTab.map((value, index) => (
            <Link
              onClick={() => itemUpdated(index)}
              key={`${value.label}_${index}`}
              href={value.route}
              className={`${Styles.Item}`}
            >
              <>{DecodeIcone(value.icone, index)}</>
              <span
                className={
                  index == itemMenuSelctedValue
                    ? `${Styles.ItemListSelected}`
                    : `${Styles.ItemList}`
                }
              >
                {value.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <div className={`${Styles.ContainerFooterofMenu}`}>
        <div className={`${Styles.Buttons}`}>
          <button className={`${Styles.All} ${Styles.AddButon}`}>
            <>
              {itemMenuSelctedValue == 4 ? (
                <SolidSquarePlusIcon width={30} height={30} color="#00277f" />
              ) : (
                <OutlineSquarePlus width={30} height={30} color="#000" />
              )}
            </>

            <span className={itemMenuSelctedValue == 4 ? Styles.Selected : ''}>
              Créer
            </span>
          </button>
          <button className={`${Styles.All} ${Styles.LogoutButton}`}>
            <ArrowLeftEndOnRectangleIcon width={30} height={30} color="#000" />
            <span>Déconnexion</span>
          </button>
        </div>
        <span className={`${Styles.Copyright}`}>
          Copyright © 2024 Jamaa Grand Lac. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default HomeMenu;
