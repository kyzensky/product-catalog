import * as React from 'react';
import cn from 'classnames';
import classes from './CustomSearch.module.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import ButtonSearch from './ButtonSearch/ButtonSearch';
import { RootState } from '../../redux/store';
import { ProductDTO } from '../../types';

const SelectSearch: React.FC = () => {
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const [autocompleteData, setAutocompleteData] = React.useState<ProductDTO[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const { activeCategory } = useSelector((state: RootState) => state.data);
  const history = useHistory();

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Сбрасываем текст поиска при изменении категории
  React.useEffect(() => {
    if (activeCategory && activeCategory !== 'default') {
      setSearchText('');
      setOpenSearch(false);
      setAutocompleteData(null);
      setIsLoading(false);
    }
  }, [activeCategory]);

  const fetchAutocomplete = async (query: string) => {
    if (!query.trim()) {
      setAutocompleteData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/Product/Search?query=${encodeURIComponent(query)}&page=1&pageSize=10`
      );
      const data: ProductDTO[] = await response.json();
      setAutocompleteData(data);
    } catch (error) {
      console.error('Error fetching autocomplete:', error);
      setAutocompleteData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setSearchText(value);

    // Debounce для автокомплита
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.length > 0) {
      setAutocompleteData(null);
      setIsLoading(false);
      debounceTimerRef.current = setTimeout(() => {
        fetchAutocomplete(value);
      }, 300);
    } else {
      setAutocompleteData(null);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const isOpen = searchText.length > 0;
    setOpenSearch(isOpen);
  }, [searchText]);

  const onClickElementSearch = (id: string) => {
    setSearchText('');
    setOpenSearch(false);
    setAutocompleteData(null);
    setIsLoading(false);
    history.push(`/${id}`);
  };

  const onClickSearch = () => {
    if (searchText.length > 0) {
      setOpenSearch(!openSearch);
    }
  };

  return (
    <div className={classes['input-wrapper']}>
      <div className={classes['search-container']}>
        <input
          ref={inputRef}
          onClick={onClickSearch}
          onChange={onChangeSearch}
          value={searchText}
          type="text"
          className={classes['search-input']}
          name="state"
          autoComplete="off"
          placeholder="Поиск"
        />
        <ButtonSearch
          searchText={searchText}
          setOpenSearch={setOpenSearch}
          setSearchText={setSearchText}
        />
      </div>
      <div className={classes[cn({ search: openSearch === true })]}>
        {openSearch && searchText.length > 0 && isLoading && (
          <div className={classes['element-search']}>Загрузка...</div>
        )}
        {openSearch &&
          searchText.length > 0 &&
          !isLoading &&
          autocompleteData !== null &&
          autocompleteData.length > 0 &&
          autocompleteData.map((value) => {
            return (
              <div
                id={value.uuid}
                key={value.uuid}
                onClick={() => onClickElementSearch(value.uuid)}
                className={classes['element-search']}
              >
                {value.name}
              </div>
            );
          })}
        {openSearch && searchText.length > 0 && !isLoading && autocompleteData !== null && autocompleteData.length === 0 && (
          <div className={classes['element-search']}>Ничего не найдено</div>
        )}
      </div>
    </div>
  );
};

export default SelectSearch;

