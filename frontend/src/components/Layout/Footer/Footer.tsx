import * as React from 'react';
import classes from './Footer.module.scss';
import useWindowResize from '../../../hooks/UseWindowResize';
import { CONTACT_PHONE_NUMBER, SOCIAL_MEDIA } from '../../../utils/constants';
import { FaInstagram, FaTelegram, FaVk, FaPhone } from 'react-icons/fa';

const Footer: React.FC = () => {
  const { width } = useWindowResize();

  const FooterMobile: React.FC = () => {
    return (
      <div className={classes.footerContainer}>
        <div className={classes.elementContainer}>
          <a href={SOCIAL_MEDIA.telegram.href}>
            <FaTelegram size={13} />
          </a>
          <a href={SOCIAL_MEDIA.instagram.href} style={{ marginLeft: '20px' }}>
            <FaInstagram size={13} />
          </a>
        </div>
        <div className={classes.logo}>
          <img className={classes.logo} src="../logo.png" alt="Logo" />
        </div>
        <div className={classes.elementContainer}>
          <a href={SOCIAL_MEDIA.vk.href}>
            <FaVk size={13} />
          </a>
          <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`} style={{ marginLeft: '20px' }}>
            <FaPhone size={13} />
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
            <FaPhone className={classes.telephoneIcon} size={24} />
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

