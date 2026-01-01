import React from 'react';
import classes from './ButtonSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterData } from '../../../redux/data/dataActions';
import { filteredProductsBySearch } from '../../../utils/filter';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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
      <FaSearch className={classes['icon-search']} size={15} />
    </button>
  );
};
export default ButtonSearch;
