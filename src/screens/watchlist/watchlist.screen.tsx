import { useContext, useEffect, useState } from 'react';
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
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository();
    request.setAuth(token);

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                const response = await request.get('/crypto/get_purchases', {});
                setWatched(response?.items || []);
            })();
        }
    }, [isLoggedIn]);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'max-width-vw-60 min-width-400 margin-auto'}>
            <Sum data={watched}/>
        </div>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-mlg-33 col-lg-25 mt-25 cursor-pointer gap-20'}>
                    <PurchaseManager data={data}/>
                </div>;
            })}
        </div>
    </div>;
};
