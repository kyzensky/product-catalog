import * as React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Container from '../../Container/Container';
import classes from './CardsBlock.module.scss';
import CatalogMagic from './CatalogMagicSkeleton';
import { RootState } from '../../../redux/store';

const CardsBlock: React.FC = () => {
  const { filterData } = useSelector((state: RootState) => state.data);
  return (
    <div className={classes['cards-block']}>
      <Container>
        <div className={classes['cards-wrapper']}>
          {filterData && filterData.length > 0 ? (
            filterData.map((item, index) => <Card data={item} key={index} id={index} />)
          ) : (
            <CatalogMagic />
          )}
        </div>
      </Container>
    </div>
  );
};

export default CardsBlock;

