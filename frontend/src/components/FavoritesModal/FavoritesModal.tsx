import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_VISIBLE_MODAL } from '../../redux/favorites';
import { RightModal } from '../RightModal/RightModal';
import { HorizontalProductCardWithQuantitySwitch } from '../HorizontalProductCardWithQuantitySwitch/HorizontalProductCardWithQuantitySwitch';
import {
  getProductsByIds,
  productMapping,
} from '../ShoppingCart/ShoppingCartModal/ShoppingCartModal';
import styles from './FavoritesModal.module.scss';
import { LOCALSTORAGE_KEYS } from '../../utils/constants';
import { useLocalStorage } from 'usehooks-ts';
import { FavoriteItem, CartItem } from '../../types';
import { RootState } from '../../redux/store';

const FavoritesModal: React.FC = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(LOCALSTORAGE_KEYS.favorites, []);
  const [items, setItems] = useState<CartItem[]>([]);
  const isVisible = useSelector((state: RootState) => state.favorites.isVisibleModal);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsByIds(favorites.map((p) => p.id)).then(data =>
      setItems(
        data.map(v => {
          const favoriteItem = favorites.find((itm) => itm.id === v.uuid);
          return productMapping({
            ...v,
            amount: favoriteItem ? 1 : 0,
          });
        })
      )
    );
  }, [favorites]);

  if (isVisible)
    return (
      <RightModal
        title="Избранное"
        onClose={() => dispatch({ type: SET_VISIBLE_MODAL, payload: false })}
      >
        {items.length > 0 ? (
          items.map((i, index: number) => (
            <div key={i.id} style={index + 1 !== items.length ? { marginBottom: '15px' } : {}}>
              <HorizontalProductCardWithQuantitySwitch
                isQuantityChange={false}
                quantityItem={i}
                removeItemHandler={(item) => {
                  setFavorites(favorites.filter((fav) => fav.id !== item.id));
                }}
              />
            </div>
          ))
        ) : (
          <span className={styles['no-products']}>Товары не добавлены</span>
        )}
      </RightModal>
    );
  
  return null;
};

export { FavoritesModal };
