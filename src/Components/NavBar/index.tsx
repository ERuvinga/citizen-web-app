import Link from 'next/link';

//Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

//atoms
import { itemSelected, NavBarDatas, StateOfNav } from '@/state/NavDatas';
import { Bars3Icon } from '@heroicons/react/24/outline';
import MobileNav from '../MobileNav';
import {
  DisplayMobilesFilters,
  DisplayMobilesMenu,
} from '@/state/SearchingDatas';
import Image from 'next/image';

const NavBar = () => {
  const [itemSelctedValue, setItemSelectedValue] = useRecoilState(itemSelected);
  const setHiddenFilters = useSetRecoilState(DisplayMobilesFilters);
  const setHiddenOptions = useSetRecoilState(DisplayMobilesMenu);

  const datasNav = useRecoilValue(NavBarDatas);
  const [navState, SetNavState] = useRecoilState(StateOfNav);

  const displayNavbarMobile = () => {
    SetNavState(true);

    // if display Menu, hidden Filters
    setHiddenFilters(false);
    setHiddenOptions(false);
  };

  //updated itemSelected function
  const itemUpdated = (itemValue: number) => {
    setItemSelectedValue(itemValue);
  };

  return (
    <div className="navigationContainer">
      <nav className="navigation">
        <span className="MobileNav">
          <Image
            width={140}
            height={40}
            alt="logo"
            src={'/logo.png'}
            placeholder="blur"
            blurDataURL="/Wshimer.svg"
            className="logo"
          />
          <Bars3Icon
            className={
              navState ? 'MenuIcone nodisplayMenu' : 'MenuIcone displayMenu'
            }
            onClick={displayNavbarMobile}
          />
        </span>
        <div className="navList">
          {datasNav.map((value, index) => (
            <Link
              onClick={() => itemUpdated(index)}
              className={
                itemSelctedValue == index ? 'itemListselected' : 'itemList'
              }
              key={`${value.link}_${index}`}
              href={value.link}
            >
              {value.label}
            </Link>
          ))}
        </div>
        <div className="NavLinks">
          <Link href={'/Login'} className="LoginLink">
            Connexion
          </Link>
        </div>
      </nav>
      <MobileNav />
    </div>
  );
};
export default NavBar;
