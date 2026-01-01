import Container from '../../Container/Container';
import React from 'react';
import classes from './Banner.module.scss';

const Banner: React.FC = () => {
  return (
    <Container>
      <div className={classes.bannerConteiner}>
        <img src="../logo2.png" alt="Banner logo" />
      </div>
    </Container>
  );
};

export default Banner;

