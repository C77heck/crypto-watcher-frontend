import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { fetch, getAuthHeader } from '../../shared/libs/requests';
import { Header } from "../components/header";
import { PurchaseManager } from './components/purchase-manager';
import { WatchedCrypto } from './components/watched-crypto';

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
    const { token } = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            const { payload } = await fetch(`/crypto/should_sell`, { headers: [getAuthHeader(token)] });

            setWatched(payload?.items || []);
        })();
    }, []);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-30 mt-25 cursor-pointer'}>
                    <PurchaseManager data={data}/>
                </div>;
            })}
        </div>
    </div>;
};
