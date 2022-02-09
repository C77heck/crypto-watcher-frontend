import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.scss';
import { BaseLayout } from './screens/components/base.layout';
import { NewCryptoScreen } from './screens/newCrypto/new-crypto.screen';
import { Spinner } from './shared/components/spinner';
import { staticData } from './shared/config/static-data';

function App() {
    const { links: { home, watchlist, newPurchase, profitCalculator } } = staticData;

    const routes = (
        <Router>
            <Routes>
                <Route path={home} element={<BaseLayout><NewCryptoScreen/></BaseLayout>}/>
                <Route path={watchlist} element={<BaseLayout><NewCryptoScreen/></BaseLayout>}/>
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
                {routes}
            </React.Suspense>
        </main>
    );
}

export default App;
