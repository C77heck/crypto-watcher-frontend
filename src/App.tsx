import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.scss';
import { BaseLayout } from './screens/components/base.layout';
import { NewCryptoScreen } from './screens/newCrypto/new-crypto.screen';
import { WatchlistScreen } from './screens/watchlist/watchlist.screen';
import { Spinner } from './shared/components/spinner';
import { staticData } from './shared/config/static-data';
import { AuthContext } from './shared/context/auth.context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
    const { links: { home, watchlist, newPurchase, profitCalculator } } = staticData;
    const auth = useAuth();
    const routes = (
        <Router>
            <Routes>
                <Route path={home} element={<BaseLayout><NewCryptoScreen/></BaseLayout>}/>
                <Route path={watchlist} element={<BaseLayout><WatchlistScreen/></BaseLayout>}/>
                <Route path={newPurchase} element={<BaseLayout><NewCryptoScreen/></BaseLayout>}/>
                <Route path={profitCalculator} element={<BaseLayout><NewCryptoScreen/></BaseLayout>}/>
            </Routes>
        </Router>
    );

    return (
        <main className="center">
            <React.Suspense
                fallback={<div><Spinner overlay/></div>}
            >
                <AuthContext.Provider value={auth}>
                    {routes}
                </AuthContext.Provider>
            </React.Suspense>
        </main>
    );
}

export default App;
