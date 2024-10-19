import { PlusIcon } from '@heroicons/react/24/outline';

//Recoil and atoms
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  DatesFilterSearching,
  Hastags,
  HastagSelected,
  TagsDisplay,
} from '@/state/SearchingDatas';
import { useState } from 'react';
import HashtagComponent from '../Hashtag';

interface FilterDatas {
  titleFilter: string;
  filterType: string;
}
const FilterComponent = (datas: FilterDatas) => {
  //States
  const tabOfTages = useRecoilValue(Hastags);
  const setDatesFilter = useSetRecoilState(DatesFilterSearching);
  const [tabOfTagsSelected, setTabOfTagsSelected] =
    useRecoilState(HastagSelected);
  const AllTags = useRecoilValue(TagsDisplay);
  const [selectedTagAfterOnchangeEnv, setSelectedTagAfterOnchangeEnv] =
    useState('#Politique');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const UpdatedTabOfTags = (ev: any) => {
    setSelectedTagAfterOnchangeEnv(ev.target.value);
  };

  // function adding Tag
  const addtag = () => {
    let selectedTagesCopy: string[] = [];

    if (tabOfTagsSelected[0] !== '') {
      selectedTagesCopy = [...tabOfTagsSelected];
    }

    //checking nothing Value
    if (!selectedTagesCopy.includes(selectedTagAfterOnchangeEnv)) {
      selectedTagesCopy.push(selectedTagAfterOnchangeEnv);
      setTabOfTagsSelected(selectedTagesCopy);
    }
  };

  // function delete Tag
  const deletTag = (item: number) => {
    const selectedTagesCopy = [...tabOfTagsSelected];
    selectedTagesCopy.splice(item, 1);
    setTabOfTagsSelected(selectedTagesCopy);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const OnChangeDateFilter = (ev: any) => {
    setDatesFilter(ev.target.value);
  };

  return (
    <section className="Filters">
      <span className="TitleFilter">{datas.titleFilter}</span>
      <div className="containerFilter">
        {datas.filterType === '#hashtag' ? (
          <>
            <div className=" addTagGroup">
              <select
                className="filterSelect"
                onChange={() => UpdatedTabOfTags(event)}
              >
                {tabOfTages.map((val, index) => (
                  <option value={val} key={`${val}_${index}`}>
                    {val.split('#')[1]}
                  </option>
                ))}
              </select>
              <div className="addBtn" onClick={addtag}>
                <PlusIcon className="icone" />
              </div>
            </div>
            <div className="TagsSelected">
              {AllTags ? (
                <HashtagComponent
                  label={'#All'}
                  closable={false}
                  closedFunction={deletTag}
                  indexInTab={0}
                  key={'All_tags'}
                />
              ) : (
                <>
                  {tabOfTagsSelected.map((val, index) => (
                    <HashtagComponent
                      label={val}
                      closable={true}
                      closedFunction={deletTag}
                      indexInTab={index}
                      key={`${val}_${index}`}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <select
            className="filterSelect"
            onChange={() => OnChangeDateFilter(event)}
          >
            <option value="all">Toutes</option>
            <option value="1week">une semaine</option>
            <option value="1month">un mois</option>
            <option value="1year">plus d`un an</option>
          </select>
        )}
      </div>
    </section>
  );
};

export const FilterForMobile = (datas: FilterDatas) => {
  //States
  const setDatesFilter = useSetRecoilState(DatesFilterSearching);
  const [selectedTagAfterOnchangeEnv, setSelectedTagAfterOnchangeEnv] =
    useState('#Politique');
  const tabOfTages = useRecoilValue(Hastags);
  const [tabOfTagsSelected, setTabOfTagsSelected] =
    useRecoilState(HastagSelected);
  const AllTags = useRecoilValue(TagsDisplay);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const UpdatedTabOfTags = (ev: any) => {
    setSelectedTagAfterOnchangeEnv(ev.target.value);
  };

  // function adding Tag
  const addtag = () => {
    let selectedTagesCopy: string[] = [];

    if (tabOfTagsSelected[0] !== '') {
      selectedTagesCopy = [...tabOfTagsSelected];
    }
    //checking nothing Value
    if (!selectedTagesCopy.includes(selectedTagAfterOnchangeEnv)) {
      selectedTagesCopy.push(selectedTagAfterOnchangeEnv);
      setTabOfTagsSelected(selectedTagesCopy);
    }
  };

  // function delete Tag
  const deletTag = (item: number) => {
    const selectedTagesCopy = [...tabOfTagsSelected];
    selectedTagesCopy.splice(item, 1);
    setTabOfTagsSelected(selectedTagesCopy);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const OnChangeDateFilter = (ev: any) => {
    setDatesFilter(ev.target.value);
  };
  return (
    <section className="FiltersMobile">
      <span className="TitleFilter">{datas.titleFilter}</span>
      <div className="containerFilter">
        {datas.filterType === '#hashtag' ? (
          <>
            <div className=" addTagGroup">
              <select
                className="filterSelect"
                onChange={() => UpdatedTabOfTags(event)}
              >
                {tabOfTages.map((val, index) => (
                  <option value={val} key={`${val}_${index}`}>
                    {val.split('#')[1]}
                  </option>
                ))}
              </select>
              <div className="addBtn" onClick={addtag}>
                <PlusIcon className="icone" />
              </div>
            </div>
            <div className="TagsSelected">
              {AllTags ? (
                <HashtagComponent
                  label={'#All'}
                  closable={false}
                  closedFunction={deletTag}
                  indexInTab={0}
                  key={'All_tags'}
                />
              ) : (
                <>
                  {tabOfTagsSelected.map((val, index) => (
                    <HashtagComponent
                      label={val}
                      closable={true}
                      closedFunction={deletTag}
                      indexInTab={index}
                      key={`${val}_${index}`}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <select
            className="filterSelect"
            onChange={() => OnChangeDateFilter(event)}
          >
            <option value="all">Toutes</option>
            <option value="1week">une semaine</option>
            <option value="1month">un mois</option>
            <option value="1year">plus d`un an</option>
          </select>
        )}
      </div>
    </section>
  );
};
export default FilterComponent;
