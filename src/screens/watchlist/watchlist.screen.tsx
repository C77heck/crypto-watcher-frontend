import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../shared/components/spinner';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from "../components/header";
import { PurchaseManager } from './components/purchase-manager';
import { Sum } from './components/sum';

export interface WatchedCryptoProps {
    date: Date;
    first: number;
    second: number;
    third: number;
    priceBoughtFor: number;
    currentPrice: number;
    percentageDiff: number;
    potentialProfit: number;
    symbol: string;
    name: string;
}

export const WatchlistScreen = () => {
    const [watched, setWatched] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository();
    request.setAuth(token);

    useEffect(() => {
        if (isLoggedIn || !!shouldRefetch) {
            (async () => {
                try {
                    console.log('fired');
                    setIsLoading(true);
                    await request.get('/crypto/latest_listings', {});
                    const response = await request.get('/crypto/get_purchases', {});
                    setWatched(response?.items || []);
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            })();
        }
    }, [isLoggedIn, shouldRefetch]);

    useEffect(() => {
        const timer = setInterval(() => setShouldRefetch(!shouldRefetch), 1000 * 60 * 3);
        return () => clearInterval(timer);
    }, [shouldRefetch]);

    return <div>
        {isLoading && <Spinner asOverlay/>}
        <Header>
            <h2 className={'header--2'}>Your current investments</h2>
        </Header>
        <div className={'max-width-vw-60 min-width-400 margin-auto'}>
            <Sum data={watched}/>
        </div>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-mlg-33 col-xl-25 mt-25 cursor-pointer gap-20'}>
                    <PurchaseManager data={data}/>
                </div>;
            })}
        </div>
    </div>;
};
