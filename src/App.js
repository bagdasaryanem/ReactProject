import { Switch, Route } from 'react-router-dom';

import Users from './components/Users/Users';
import UserPage from './components/UserPage/UserPage';
import NotFoundPage from './components/NotFoundPage';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Users} />
        <Route exact path='/:username' component={UserPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
