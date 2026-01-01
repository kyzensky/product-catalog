import * as React from 'react';
import { Layout } from './components/Layout/Layout';
import './App.scss';
import { useDispatch } from 'react-redux';
import { fetchData } from './redux/data/dataActions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProductCard } from './pages/ProductCard/ProductCard';
import MainPage from './components/MainPage/MainPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import { AppDispatch } from './redux/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:card" exact component={ProductCard} />
          <Route path="/categories" exact component={CategoriesPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

