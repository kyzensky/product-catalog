import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Container from '../../Container/Container';
import classes from './CardsBlock.module.scss';
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchProductsList } from '../../../redux/data/dataActions';

const CardsBlock: React.FC = () => {
  const { filterData, hasMore, loading, searchQuery, currentPage, activeCategory } = useSelector(
    (state: RootState) => state.data
  );
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  // Загружаем список товаров при монтировании компонента
  React.useEffect(() => {
    dispatch(fetchProductsList(1, '', ''));
  }, [dispatch]);

  React.useEffect(() => {
    // Не создаем observer если данных нет, идет загрузка, или нет больше данных
    if (!loadMoreRef.current || loading || !hasMore || filterData.length === 0) {
      return;
    }

    // Удаляем старый observer
    if (observerRef.current && loadMoreRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading && filterData.length > 0) {
          const nextPage = currentPage + 1;
          const category = activeCategory && activeCategory !== 'default' ? activeCategory : '';
          dispatch(fetchProductsList(nextPage, searchQuery, category));
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, currentPage, searchQuery, activeCategory, dispatch, filterData.length]);

  return (
    <div className={classes['cards-block']}>
      <Container>
        <div className={classes['cards-wrapper']}>
          {filterData && filterData.length > 0 &&
            filterData.map((item, index) => (
              <Card data={item} key={`${item.uuid}-${index}`} id={index} />
            ))}
        </div>
        {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>}
        {hasMore && filterData.length > 0 && (
          <div ref={loadMoreRef} style={{ height: '20px' }} />
        )}
      </Container>
    </div>
  );
};

export default CardsBlock;

