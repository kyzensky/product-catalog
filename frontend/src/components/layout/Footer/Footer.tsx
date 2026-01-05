import * as React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.copyright}>
        © {new Date().getFullYear()} ELDUDKA.RU
      </div>
    </div>
  );
};

export default Footer;
