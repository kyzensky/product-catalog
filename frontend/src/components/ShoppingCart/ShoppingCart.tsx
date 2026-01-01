import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_VISIBLE_MODAL } from '../../redux/shoppingCart';
import { ShoppingCartButton } from './ShoppingCartButton/ShoppingCartButton';
import {
  ShoppingCartModal,
  getProductsByIds,
  productMapping,
} from './ShoppingCartModal/ShoppingCartModal';
import { LOCALSTORAGE_KEYS } from '../../utils/constants';
import { useLocalStorage } from 'usehooks-ts';
import { ShoppingCartItem, CartItem } from '../../types';
import { RootState } from '../../redux/store';

const ShoppingCart = () => {
  const isVisible = useSelector((state: RootState) => state.shoppingCart.isVisibleModal);
  const dispatch = useDispatch();
  const [shoppingCart, setShoppingCart] = useLocalStorage<ShoppingCartItem[]>(
    LOCALSTORAGE_KEYS.shoppingCart,
    []
  );
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    getProductsByIds(shoppingCart.map((p) => p.id)).then(data =>
      setItems(
        data.map(v => {
          const cartItem = shoppingCart.find((itm) => itm.id === v.uuid);
          return productMapping({
            ...v,
            amount: cartItem?.amount || 0,
          });
        })
      )
    );
  }, [shoppingCart]);

  return isVisible ? (
    <ShoppingCartModal
      onClose={() => dispatch({ type: SET_VISIBLE_MODAL, payload: false })}
      itemsOnChange={(items) => {
        setShoppingCart(items.map(item => ({ id: item.id, amount: item.amount })));
      }}
      items={items}
    />
  ) : (
    <ShoppingCartButton onClick={() => dispatch({ type: SET_VISIBLE_MODAL, payload: true })} />
  );
};

export { ShoppingCart };
