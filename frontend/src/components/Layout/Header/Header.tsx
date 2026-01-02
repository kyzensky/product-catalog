import * as React from 'react';
import Container from '../../Container/Container';
import CustomSearch from '../../UI/CustomSearch';
import classes from './Header.module.scss';
import { SOCIAL_MEDIA, CONTACT_PHONE_NUMBER } from '../../../utils/constants';
import { Logo } from '../../Logo/Logo';
import { FaInstagram, FaTelegram, FaVk, FaPhone } from 'react-icons/fa';

const iconMap = {
  instagram: FaInstagram,
  telegram: FaTelegram,
  vk: FaVk,
};

const Header: React.FC = () => {
  return (
    <>
      <header className={classes.mobileHeader}>
        <Container>
          <div className={classes.mobileHeaderTop}>
            <Logo />
            <div className={classes.mobileIconsContainer}>
              {Object.keys(SOCIAL_MEDIA).map((key, index) => {
                const Icon = iconMap[key as keyof typeof iconMap];
                return (
                  <a key={index} href={SOCIAL_MEDIA[key as keyof typeof SOCIAL_MEDIA].href}>
                    <Icon className={classes.mainIcon} size={21} />
                  </a>
                );
              })}
              <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`}>
                <FaPhone className={classes.mainIcon} size={21} />
              </a>
            </div>
          </div>
          <div className={classes.mobileHeaderSearch}>
            <CustomSearch />
          </div>
        </Container>
      </header>
      <header className={classes.desktopHeader}>
        <Container>
          <div className={classes.headerContent}>
            <Logo />
            <CustomSearch />
            <div className={classes.iconsContainer}>
              {Object.keys(SOCIAL_MEDIA).map((key, index) => {
                const Icon = iconMap[key as keyof typeof iconMap];
                return (
                  <a key={index} href={SOCIAL_MEDIA[key as keyof typeof SOCIAL_MEDIA].href}>
                    <Icon className={classes.mainIcon} size={21} />
                  </a>
                );
              })}
              <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`}>
                <FaPhone className={classes.mainIcon} size={21} />
              </a>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
