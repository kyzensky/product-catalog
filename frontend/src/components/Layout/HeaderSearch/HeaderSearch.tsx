import * as React from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../Container/Container';
import CustomSearch from '../../UI/CustomSearch';
import classes from './HeaderSearch.module.scss';
import { SOCIAL_MEDIA } from '../../../utils/constants';
import { setVisibleModal } from '../../../redux/mobileMenu';
import { Logo } from '../../Logo/Logo';
import { FaInstagram, FaTelegram, FaVk } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

const iconMap = {
  instagram: FaInstagram,
  telegram: FaTelegram,
  vk: FaVk,
};

const HeaderSearch: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className={classes.headerSecond}>
      <div className={classes['mobile-block']}>
        <Logo />
        <div
          onClick={() => dispatch(setVisibleModal(true))}
          className={classes['mobile-menu-icon']}
        >
          <HiMenu size={20} />
        </div>
      </div>
      <Container>
        <div className={classes.headerSecondWrapper}>
          <div className={classes['desktop-logo']}>
            <Logo />
          </div>
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
          </div>
        </div>
      </Container>
    </header>
  );
};
export default HeaderSearch;

