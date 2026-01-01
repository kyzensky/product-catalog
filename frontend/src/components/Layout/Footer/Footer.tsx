import * as React from 'react';
import classes from './Footer.module.scss';
import useWindowResize from '../../../hooks/UseWindowResize';
import { CONTACT_PHONE_NUMBER, SOCIAL_MEDIA } from '../../../utils/constants';

const Footer: React.FC = () => {
  const { width } = useWindowResize();

  const FooterMobile: React.FC = () => {
    return (
      <div className={classes.footerContainer}>
        <div className={classes.elementContainer}>
          <a href={SOCIAL_MEDIA.telegram.href}>
            <img width="13" height="13" src="../tg_icon.png" alt="Telegram" />
          </a>
          <a href={SOCIAL_MEDIA.instagram.href}>
            <img style={{ marginLeft: '20px' }} width="13" height="13" src="../inst_icon.png" alt="Instagram" />
          </a>
        </div>
        <div className={classes.logo}>
          <img className={classes.logo} src="../logo.png" alt="Logo" />
        </div>
        <div className={classes.elementContainer}>
          <a href={SOCIAL_MEDIA.vk.href}>
            <img width="13" height="13" src="../vk_icon.png" alt="VK" />
          </a>
          <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`}>
            <img style={{ marginLeft: '20px' }} width="13" height="13" src="../telephone.png" alt="Phone" />
          </a>
        </div>
      </div>
    );
  };

  const FooterClassic: React.FC = () => {
    return (
      <div className={classes.footerContainer}>
        <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`}>
          <div className={classes.elementContainer}>
            <img className={classes.telephoneIcon} src="../telephone.png" alt="Phone" />
            <div className={classes.telephone}>{CONTACT_PHONE_NUMBER.text}</div>
          </div>
        </a>
        <a href="/">
          <div className={classes.elementContainer}>
            <img className={classes.logo} src="../logo.png" alt="Logo" />
          </div>
        </a>
        <div className={classes.elementContainer}></div>
      </div>
    );
  };

  return width > 860 ? <FooterClassic /> : <FooterMobile />;
};

export default Footer;

