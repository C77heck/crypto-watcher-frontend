import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Spinner } from './shared/components/spinner';
import { Home } from './screens/homeScreen/home';

function App() {
  const routes = (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
      </Routes>
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
