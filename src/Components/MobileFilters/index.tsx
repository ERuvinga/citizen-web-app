import { useRecoilValue } from 'recoil';

// atoms and states
import { FilterForMobile } from '../Filters';
import { DisplayMobilesFilters } from '@/state/SearchingDatas';
import { useEffect, useState } from 'react';

const MobileFilters = () => {
  const mobileFiltersState = useRecoilValue(DisplayMobilesFilters);
  const [HiddenFilters, setHiddenFilters] = useState(false);

  useEffect(() => {
    if (mobileFiltersState) {
      setHiddenFilters(mobileFiltersState);
    } else {
      setTimeout(() => setHiddenFilters(mobileFiltersState), 1000);
    }
  }, [mobileFiltersState]);
  return (
    <>
      {HiddenFilters ? (
        <aside
          className={
            mobileFiltersState
              ? 'MobileFiltersContainer displayFilter'
              : 'MobileFiltersContainer nodisplayFilter'
          }
        >
          <FilterForMobile titleFilter="Tags" filterType="#hashtag" />
          <FilterForMobile titleFilter="Dates" filterType="#dates" />
        </aside>
      ) : null}
    </>
  );
};

export default MobileFilters;
