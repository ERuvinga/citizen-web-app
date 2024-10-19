/* eslint-disable @typescript-eslint/no-explicit-any */
//React(Next) and Recoil
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import { useEffect, useState } from 'react';
import Image from 'next/image';

//Components
import SearchField from '@/Components/Searching';
import HeadDatas from '@/Components/Header';
import NavBar from '@/Components/NavBar';
import Loading from '@/Components/Loading';
import FilterComponent from '@/Components/Filters';

// atoms and statesRefreshState
import { itemSelected } from '@/state/NavDatas';
import {
  RefreshDatasState,
  SearchDatas,
  DisplayMobilesFilters,
  keysWordsforSearching,
  HastagSelected,
  DatesFilterSearching,
  ResultsOfSearching,
  DataFilteredByTagsAndDay,
} from '@/state/SearchingDatas';
import CardOfPub from '@/Components/CardSearchResulta';
import MobileFilters from '@/Components/MobileFilters';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { LinksToApi } from '@/state/HomeDatas';

const SearchingPage = () => {
  // states
  const setItemSelected = useSetRecoilState(itemSelected);
  const RefreshResult = useRecoilValue(RefreshDatasState);
  const [LoadingState, setLoadingState] = useState(false);

  const [SearchPageState, setSearchPageState] = useRecoilState(SearchDatas);
  const [mobileFiltersState, setMobileFiltersState] = useRecoilState(
    DisplayMobilesFilters
  );

  const linkToApi = useRecoilValue(LinksToApi);

  // searchings States
  const WordsOfSearching = useRecoilValue(keysWordsforSearching); // keys word of searching
  const filtersbyTags = useRecoilValue(HastagSelected); // keys word of searching
  const DatesFilter = useRecoilValue(DatesFilterSearching);

  //Reset states functions
  const resetWordsOfSearching = useResetRecoilState(keysWordsforSearching); // keys word of searching
  const resetSearchResults = useResetRecoilState(ResultsOfSearching); // result of searching

  // Datas:Results of Searching and filter
  const setSearchResults: any = useSetRecoilState(ResultsOfSearching); // result of searching
  const FilterResults = useRecoilValue(DataFilteredByTagsAndDay); // result of Filter

  const ResetSearchingStates = () => {
    resetSearchResults();
    resetWordsOfSearching();
    setSearchPageState(false);
  };

  const refreshResults = () => {
    setLoadingState(true);
    fetch(`${linkToApi.remote}/pub/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        textSearching: WordsOfSearching,
        tags: filtersbyTags,
        dateLimit: DatesFilter,
      }),
    })
      .then((RDatas) => {
        if (RDatas.ok) {
          RDatas.json().then((DatasFunds) => {
            setSearchResults(DatasFunds.pubs); // saved Results in Atom
            setLoadingState(false); // disabled Loading Component and Display Results Card
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ResetSearchingStates();
    setItemSelected(2);
  }, []);

  useEffect(() => {
    if (SearchPageState) {
      refreshResults();
    }
  }, [RefreshResult]);
  return (
    <>
      <HeadDatas
        title="Searching "
        description=" rescherchez des analyses et astuces sur la platforme veuilleur du web"
      />
      <main className="ContSearching">
        <NavBar />
        <section className="ContFilterAndField">
          <FilterComponent titleFilter="Tags" filterType="#hashtag" />
          <section className="Searching">
            <SearchField />
            {SearchPageState ? (
              <>
                {!LoadingState && FilterResults ? (
                  <div className="AllResults">
                    {FilterResults.length > 0 ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      FilterResults.map((value: any) => (
                        <CardOfPub
                          key={value._id}
                          HeaderPub={value.HeaderPub}
                          titlePub={value.titlePub}
                          dates={value.datePub}
                          likes={value.likes}
                          view={value.view}
                          tags={value.tags}
                          userPublish={value.userPublish}
                          comments={value.comments}
                        />
                      ))
                    ) : (
                      <div className=" IllustrationSerch">
                        <Image
                          quality={100}
                          width={100}
                          height={100}
                          alt="SearchingIllustartion"
                          src={'/illustrations/404.svg'}
                          className="Searchimage"
                          placeholder="blur"
                          blurDataURL="/Wshimer.svg"
                        />
                        <span className="ErrorMsg">
                          Oop`s Aucun resultat trouvé!
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {LoadingState ? (
                      <Loading
                        contenteText={'Chargement ...'}
                        hiddenText={false}
                      />
                    ) : (
                      <div className=" IllustrationSerch">
                        <Image
                          quality={100}
                          width={100}
                          height={100}
                          alt="SearchingIllustartion"
                          src={'/illustrations/404.svg'}
                          className="Searchimage"
                          placeholder="blur"
                          blurDataURL="/Wshimer.svg"
                        />
                        <span className="ErrorMsg">
                          Oop`s Aucun resultat trouvé!
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className=" IllustrationSerch">
                <Image
                  quality={100}
                  width={200}
                  height={200}
                  alt="SearchingIllustartion"
                  src={'/illustrations/Filesearching.svg'}
                  className="Searchimage"
                  placeholder="blur"
                  blurDataURL="/Wshimer.svg"
                />
              </div>
            )}
          </section>
          <FilterComponent titleFilter=" Dates" filterType="dates" />
        </section>
      </main>
      <MobileFilters />
      <div
        className="FiltersBtn"
        onClick={() => setMobileFiltersState(!mobileFiltersState)}
      >
        <AdjustmentsHorizontalIcon className="icone" />
      </div>
    </>
  );
};

export default SearchingPage;
