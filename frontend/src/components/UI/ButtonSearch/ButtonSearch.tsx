import React from 'react';
import classes from './ButtonSearch.module.scss';
import { useDispatch } from 'react-redux';
import { setActiveCategory, searchProducts } from '../../../redux/data/dataActions';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AppDispatch } from '../../../redux/store';

interface ButtonSearchProps {
  searchText: string;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const ButtonSearch: React.FC<ButtonSearchProps> = ({ searchText, setOpenSearch, setSearchText }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const onClickButtonSearch = () => {
    if (!searchText.trim()) return;
    
    dispatch(setActiveCategory('default'));
    dispatch(searchProducts(searchText.trim()));
    setOpenSearch(false);
    setSearchText('');
    history.push('/');
  };

  return (
    <button onClick={onClickButtonSearch} className={classes['button-search']}>
      <FaSearch className={classes['icon-search']} size={15} />
    </button>
  );
};
export default ButtonSearch;
