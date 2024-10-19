import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';
import { useRecoilState, useRecoilValue } from 'recoil';

// atoms
import { NavBarDatas, StateOfNav, itemSelected } from '@/state/NavDatas';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileNav = () => {
  const [navState, setNavState] = useRecoilState(StateOfNav);
  const [MobileNaveDisplay, setMobileNaveDisplay] = useState(false);
  const [itemSelctedValue, setItemSelectedValue] = useRecoilState(itemSelected);
  const datasNav = useRecoilValue(NavBarDatas);

  //updated itemSelected function
  const itemUpdated = (itemValue: number) => {
    setItemSelectedValue(itemValue);

    // resets States
    setNavState(false);
  };
  useEffect(() => {
    if (navState) {
      setMobileNaveDisplay(navState);
    } else if (!navState && MobileNaveDisplay) {
      setTimeout(() => {
        setMobileNaveDisplay(navState);
      }, 1000);
    }
  }, [navState]);
  return (
    <>
      {MobileNaveDisplay ? (
        <>
          <div className={navState ? 'WrapeNav' : 'NoWrapeNav'}></div>
          <aside
            className={
              navState ? 'ContainerMenuDisplay' : 'ContainerMenuNoDisplay'
            }
          >
            <div className="MobileNavBar">
              <nav className="Mnavigation">
                <div className="Mlogo">
                  <Image
                    width={130}
                    height={45}
                    alt="logo"
                    src={'/logo.png'}
                    placeholder="blur"
                    blurDataURL="/Wshimer.svg"
                  />
                </div>
                <div className="MnavList">
                  {datasNav.map((value, index) => (
                    <Link
                      onClick={() => itemUpdated(index)}
                      className={
                        itemSelctedValue == index
                          ? 'MitemListselected'
                          : 'MitemList'
                      }
                      key={`${value.link}_${index}`}
                      href={value.link}
                    >
                      {value.label}
                    </Link>
                  ))}
                </div>
                <div className="MNavLinks ">
                  <div className="NewsText ">
                    <p>Télécharger la version mobile</p>
                    <div className="ApplicationsButtons ">
                      <Link href={'#'} className="Dbutton">
                        <img
                          alt={`Play store image`}
                          src={`/Icones/playStore.svg`}
                        />
                        Play store
                      </Link>
                      <Link href={'#'} className="Dbutton">
                        <img
                          alt={`Apple store image`}
                          src={`/Icones/AppleStore.svg`}
                        />
                        Apple store
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div
              className="ContainerClosedMenuBtn"
              onClick={() => setNavState(false)}
            >
              <ChevronDoubleLeftIcon
                className={navState ? 'closeMenu' : 'nodisplay'}
              />
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
};

export default MobileNav;
