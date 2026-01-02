import {
  SET_FILTER_DATA,
  SET_FULL_DATA,
  SET_ACTIVE_CATEGORY,
  SET_SEARCH_DATA,
  APPEND_FILTER_DATA,
  SET_HAS_MORE,
  SET_LOADING,
  SET_SEARCH_QUERY,
  SET_CURRENT_PAGE,
} from './dataTypes';
import { ProductDTO } from '../../types';

interface DataState {
  filterData: ProductDTO[];
  fullData: ProductDTO[];
  searchData: ProductDTO[];
  activeCategory: string;
  hasMore: boolean;
  loading: boolean;
  searchQuery: string;
  currentPage: number;
  currentCategory: string;
}

interface DataAction {
  type: string;
  payload?: any;
}

const INITIAL_STATE: DataState = {
  filterData: [],
  fullData: [],
  searchData: [],
  activeCategory: 'default',
  hasMore: true,
  loading: false,
  searchQuery: '',
  currentPage: 1,
  currentCategory: '',
};

const dataReducer = (
  state: DataState = INITIAL_STATE,
  action: DataAction
): DataState => {
  switch (action.type) {
    case SET_FILTER_DATA:
      return { ...state, filterData: action.payload, currentPage: 1 };
    case APPEND_FILTER_DATA:
      return { ...state, filterData: [...state.filterData, ...action.payload], currentPage: state.currentPage + 1 };
    case SET_FULL_DATA:
      return { ...state, fullData: action.payload };
    case SET_SEARCH_DATA:
      return { ...state, searchData: action.payload };
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload, currentPage: 1, currentCategory: action.payload, searchQuery: '' };
    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload, currentPage: 1, currentCategory: '' };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default dataReducer;

