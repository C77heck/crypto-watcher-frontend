import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { Spinner } from './shared/components/spinner';

function App() {
  const routes = (
    <Router>
      <Switch>
        <Route path='/' exact>
          <h2>suck it bitch</h2>
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );

  return (
    <main className='center'>
      <React.Suspense
        fallback={<div><Spinner overlay /></div>}
      >
        {routes}
      </React.Suspense>
    </main>
  );
}

export default App;
