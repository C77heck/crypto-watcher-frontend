import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.scss';
import { NewCryptoForm } from './screens/newCrypto/components/new-crypto.form';
import { NewCryptoScreen } from './screens/newCrypto/new-crypto.screen';
import { Spinner } from './shared/components/spinner';

function App() {
    const routes = (
        <Router>
            <Routes>
                <Route path="/" element={<NewCryptoScreen/>}>
                </Route>
            </Routes>
        </Router>
    );

    return (
        <main className="center">
            <React.Suspense
                fallback={<div><Spinner overlay/></div>}
            >
                {routes}
            </React.Suspense>
        </main>
    );
}

export default App;
