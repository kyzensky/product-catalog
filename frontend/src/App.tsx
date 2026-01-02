import * as React from 'react';
import { Layout } from './components/Layout/Layout';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProductCard } from './pages/ProductCard/ProductCard';
import MainPage from './components/MainPage/MainPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';

const App: React.FC = () => {

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

