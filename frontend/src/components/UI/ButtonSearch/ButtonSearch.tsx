import React from 'react';
import classes from './ButtonSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterData } from '../../../redux/data/dataActions';
import { filteredProductsBySearch } from '../../../utils/filter';
import { useHistory } from 'react-router-dom';

interface ButtonSearchProps {
  searchText: string;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonSearch: React.FC<ButtonSearchProps> = ({ searchText, setOpenSearch }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { fullData } = useSelector(({ data }: any) => data);

  const onClickButtonSearch = () => {
    dispatch(setFilterData(filteredProductsBySearch(fullData, searchText)));
    setOpenSearch(false);
    history.push(``);
  };

  return (
    <button onClick={onClickButtonSearch} className={classes['button-search']}>
      <img className={classes['icon-search']} src="./search-30.png" alt="search" />
    </button>
  );
};
export default ButtonSearch;
