import { useRouter } from 'next/router';

// //Recoil
// import { useRecoilState, useSetRecoilState } from 'recoil';

// //atoms
// import { StateOfNav } from '@/state/NavDatas';
// import {
//   DisplayMobilesFilters,
//   DisplayMobilesMenu,
// } from '@/state/SearchingDatas';
import Image from 'next/image';

//components
import {
  MagnifyingGlassIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/solid';

//style and Types
import Styles from '@/Components/Auth/AuthNavBar/NavBar.module.css';
import { LocalUserData } from '@/Constants/Type';

interface NavDatas {
  userDatas: LocalUserData;
}

const AuthNavBar = (datas: NavDatas) => {
  //Atoms
  // const setHiddenFilters = useSetRecoilState(DisplayMobilesFilters);
  // const setHiddenOptions = useSetRecoilState(DisplayMobilesMenu);
  // const [navState, SetNavState] = useRecoilState(StateOfNav);

  //states and Hooks
  const navigation = useRouter();
  // const displayNavbarMobile = () => {
  //   SetNavState(true);

  //   // if display Menu, hidden Filters
  //   setHiddenFilters(false);
  //   setHiddenOptions(false);
  // };

  return (
    <div className={`${Styles.AuthnavigationContainer}`}>
      <nav className={`${Styles.Authnavigation}`}>
        <Image
          width={500}
          height={500}
          alt="logo"
          src={'/logo.png'}
          placeholder="blur"
          blurDataURL="/Wshimer.svg"
          className={`${Styles.logo}`}
        />
        <div className={`${Styles.AuthNavLinks}`}>
          <div className={`${Styles.SearchBtn}`}>
            <MagnifyingGlassIcon width={28} height={28} color="#9ba1a6" />
            <span>Recherche</span>
          </div>
          <div className={`${Styles.AddButton}`}>
            <SquaresPlusIcon width={30} height={30} color="#00277f" />
            <span>Créer</span>
          </div>
          <Image
            onClick={() => {
              navigation.push('/Auth/Profile');
            }}
            className={Styles.NavProfileImage}
            src={
              datas.userDatas.imageProfile
                ? datas.userDatas.imageProfile
                : '/Placeholders/profile.png'
            }
            width={500}
            height={500}
            alt="profilImage"
          />
        </div>
      </nav>
    </div>
  );
};
export default AuthNavBar;
