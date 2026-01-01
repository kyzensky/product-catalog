import Banner from '../Layout/Banner/Banner';
import Benefits from '../Layout/Benefits/Benefits';
import CardsBlock from './CardsBlock/CardsBlock';
import * as React from 'react';

const MainPage: React.FC = () => {
  return (
    <>
      <Banner />
      <Benefits />
      <CardsBlock />
    </>
  );
};

export default MainPage;

