import {
  SET_FILTER_DATA,
  SET_FULL_DATA,
  SET_ACTIVE_CATEGORY,
  SET_SEARCH_DATA,
} from './dataTypes';
import { API_URL } from '../../utils/constants';
import { ProductDTO } from '../../types';
import { Dispatch } from 'redux';

export const setFullData = (payload: ProductDTO[]) => {
  return {
    type: SET_FULL_DATA,
    payload,
  };
};

export const setFilterData = (payload: ProductDTO[]) => {
  return {
    type: SET_FILTER_DATA,
    payload,
  };
};

export const setSearchData = (payload: ProductDTO[]) => {
  return {
    type: SET_SEARCH_DATA,
    payload,
  };
};

export const setActiveCategory = (payload: string) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload,
  };
};

export const fetchData = () => async (dispatch: Dispatch) => {
  const data: ProductDTO[] = await fetch(`${API_URL}/Product/GetList`).then(
    (response) => response.json()
  );
  dispatch(setFullData(data));
  dispatch(setFilterData(data));
  dispatch(setSearchData(data));
};

