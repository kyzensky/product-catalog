import * as React from 'react';
import classes from './Category.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../Container/Container';
import { NavLink, useHistory } from 'react-router-dom';
import { setActiveCategory, fetchProductsList } from '../../../redux/data/dataActions';
import { RootState, AppDispatch } from '../../../redux/store';

const categories = [
  { name: 'Жидкости', link: '/liquid' },
  { name: 'Одноразки', link: '/disposable' },
  { name: 'Поды', link: '/pod' },
  { name: 'Картриджи', link: '/cartridge' },
  { name: 'Испарители', link: 'evaporator' },
];

const Category: React.FC = () => {
  const { activeCategory } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const onClickActiveCategory = (category: string, e: React.MouseEvent) => {
    if (activeCategory === category) {
      e.preventDefault();
      return;
    }
    history.push('/');
    dispatch(setActiveCategory(category));
    dispatch(fetchProductsList(1, '', category));
  };

  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.categoriesWrapper}>
          {categories.map((category, index) => {
            return (
              <NavLink
                to="/"
                onClick={(e) => onClickActiveCategory(category.name, e)}
                className={`${classes.categoriesItem} ${
                  activeCategory === category.name ? classes.active : ''
                }`}
                data-category-name={category.name}
                key={index}
              >
                <p className={classes.categoriesItemName}>{category.name}</p>
              </NavLink>
            );
          })}
        </div>
      </Container>
    </header>
  );
};

export default Category;

