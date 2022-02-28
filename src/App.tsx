import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.scss';
import { BaseLayout } from './screens/components/base.layout';
import { FluctuationScreen } from './screens/fluctuationScreen/fluctuation.screen';
import { Home } from './screens/homeScreen/home';
import { NewCryptoScreen } from './screens/newCrypto/new-crypto.screen';
import { WatchlistScreen } from './screens/watchlist/watchlist.screen';
import { Auth } from './shared/components/Auth';
import { Spinner } from './shared/components/spinner';
import { staticData } from './shared/config/static-data';
import { AuthContext } from './shared/context/auth.context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {

    const { links: { home, watchlist, newPurchase, changesInValue } } = staticData;
    const auth = useAuth();
    const routes = (
        <Router>
            <Routes>
                <Route path={home} element={<BaseLayout><Home/></BaseLayout>}/>
                <Route path={watchlist} element={<Auth><BaseLayout><WatchlistScreen/></BaseLayout></Auth>}/>
                <Route path={newPurchase} element={<Auth><BaseLayout><NewCryptoScreen/></BaseLayout></Auth>}/>
                <Route path={changesInValue} element={<BaseLayout><FluctuationScreen/></BaseLayout>}/>
            </Routes>
        </Router>
    );

    return (
        <main className="center pt-100 background--1">
            <React.Suspense
                fallback={<div><Spinner asOverlay/></div>}
            >
                <AuthContext.Provider value={auth}>
                    {routes}
                </AuthContext.Provider>
            </React.Suspense>
        </main>
    );
}

export default App;
