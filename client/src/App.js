import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { registerUser } from './redux/actions/testActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RestaurantsHome from './pages/RestaurantsHome';
import {ToastContainer} from 'react-toastify'
import Header from './components/Header';

import Favorites from './pages/FavoritesPage';
import Drinks from './pages/Drinks';
import ModalManager from './utils/ModalManager';
import DetailsPage from './pages/DetailsPage';

//
function App() {
  return (
    <>
      <ModalManager />
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <>
            <Header />
            <Route path="/" exact component={RestaurantsHome} />
            <Route path="/restaurants/:id" exact component={DetailsPage} />
            <Route path="/drinks" component={Drinks} />
            <Route path="/favorites" component={Favorites} />
          </>
        </Switch>

        <ToastContainer position="bottom-right" />
      </Router>
    </>
  );
}

export default App;
