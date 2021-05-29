import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { connect } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute'

import './App.scss';

const App = ({ auth, ...rest }) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path={'/'} exact auth={auth} exact component={Dashboard} />
          <Route path={'/login'} render={() => auth ? <Redirect to={'/'} /> : <Login />} />
          <Route path={'/register'} render={() => auth ? <Redirect to={'/'} /> : <Register />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(App);
