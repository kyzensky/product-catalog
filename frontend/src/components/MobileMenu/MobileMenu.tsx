import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveCategory, setFilterData, setSearchData } from '../../redux/data/dataActions';
import { filteredProductsByCategory } from '../../utils/filter';
import { setVisibleModal as setVisibleFavoritesModal } from '../../redux/favorites';
import { setVisibleModal as setVisibleMobileModal } from '../../redux/mobileMenu';
import { CONTACT_PHONE_NUMBER, SOCIAL_MEDIA } from '../../utils/constants';
import styles from './MobileMenu.module.scss';
import { RootState } from '../../redux/store';
import { FaInstagram, FaTelegram, FaVk, FaPhone } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';

const MobileMenu: React.FC = () => {
  const isVisible = useSelector((state: RootState) => state.mobileMenu.isVisibleModal);
  const dispatch = useDispatch();
  const fullData = useSelector((state: RootState) => state.data.fullData);

  const hide = () => {
    dispatch(setVisibleMobileModal(false));
  };

  const chooseCategory = (category: string) => {
    const filter = filteredProductsByCategory(fullData, category);
    dispatch(setActiveCategory(category));
    dispatch(setFilterData(filter));
    dispatch(setSearchData(fullData));
    hide();
  };

  if (isVisible) {
    return (
      <div className={styles['mobile-menu']}>
        <div className={styles['mobile-menu__header']}>
          <a onClick={hide} className={styles['header__close-button']}>
            <AiOutlineClose size={20} />
          </a>
          <div className={styles['header__right-side']}>
            <a
              onClick={() => dispatch(setVisibleFavoritesModal(true))}
              className={styles['header__button']}
            >
              <AiOutlineHeart size={20} />
            </a>
            <a
              href={`tel:+${CONTACT_PHONE_NUMBER.value}`}
              className={styles['header__button']}
            >
              <FaPhone size={20} />
            </a>
          </div>
        </div>
        <ul className={styles['mobile-menu__categories']}>
          <li onClick={() => chooseCategory('Поды')}>Поды</li>
          <li onClick={() => chooseCategory('Испарители')}>Испарители</li>
          <li onClick={() => chooseCategory('Жидкости')}>Жидкости</li>
          <li onClick={() => chooseCategory('Картриджи')}>Картриджи</li>
          <li onClick={() => chooseCategory('Одноразки')}>Одноразки</li>
        </ul>
        <div className={styles['mobile-menu__social-networks']}>
          <a href={SOCIAL_MEDIA.instagram.href} className={styles['social-network']}>
            <FaInstagram size={20} />
          </a>
          <a href={SOCIAL_MEDIA.telegram.href} className={styles['social-network']}>
            <FaTelegram size={20} />
          </a>
          <a href={SOCIAL_MEDIA.vk.href} className={styles['social-network']}>
            <FaVk size={20} />
          </a>
        </div>
      </div>
    );
  }
  
  return null;
};

export { MobileMenu };
