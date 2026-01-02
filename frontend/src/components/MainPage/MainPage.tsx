import CardsBlock from './CardsBlock/CardsBlock';
import Category from '../Layout/Category/Category';
import * as React from 'react';

const MainPage: React.FC = () => {
  return (
    <>
      <Category />
      <CardsBlock />
    </>
  );
};

export default MainPage;

