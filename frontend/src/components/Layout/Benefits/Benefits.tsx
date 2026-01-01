import Container from '../../Container/Container';
import classes from './Benefits.module.scss';
import * as React from 'react';

const Benefits: React.FC = () => {
  return (
    <Container>
      <div className={classes.benefitsContainer}>
        <div className={classes.benefitsElement}>
          <img src="../benefits1.png" alt="Professional consultation" />
          <div className={classes.benefitsText}>Профессиональная консультация</div>
        </div>
        <div className={classes.benefitsElement}>
          <img src="../benefits2.png" alt="Original only" />
          <div className={classes.benefitsText}>Только оригинал</div>
        </div>
        <div className={classes.benefitsElement}>
          <img src="../benefits3.png" alt="Device repair" />
          <div className={classes.benefitsText}>Ремонт девайсов</div>
        </div>
        <div className={classes.benefitsElement}>
          <img src="../benefits4.png" alt="Loyalty system" />
          <div className={classes.benefitsText}>Система лояльности</div>
        </div>
      </div>
    </Container>
  );
};

export default Benefits;

