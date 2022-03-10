import {useContext, useEffect, useState} from 'react';
import {Spinner} from '../../shared/components/spinner';
import {AuthContext} from '../../shared/context/auth.context';
import {ErrorModal} from '../../shared/form/error-modal';
import {useClient} from '../../shared/hooks/client';
import {Header} from "../components/header";
import {PurchaseManager} from './components/purchase-manager';
import {Sum} from './components/sum';

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
    const {isLoggedIn} = useContext(AuthContext);
    const {isLoading, error, clearError, client} = useClient();

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                // client('/crypto/latest_listings', 'get');
                const response: any = await client('/crypto/get_purchases', 'get');
                setWatched(response?.items || []);
            })();
        }
    }, [isLoggedIn]);

    return <div>
        {isLoading && <Spinner asOverlay/>}
        <ErrorModal
            show={!!error}
            errorMessage={error}
            onClick={clearError}
        />
        <Header>
            <h2 className={'header--2'}>Current investments</h2>
        </Header>
        <div className={'width-px-710 max-width-810  margin-auto'}>
            <Sum data={watched}/>
        </div>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {!watched || !!watched && !watched.length && <Header>
                <h2 className={'header--2 text-color--light-3 fs-30'}>No favourites has been added yet</h2>
            </Header>}
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-lg-33 col-xl-25 mt-25 cursor-pointer gap-40'}>
                    <PurchaseManager data={data}/>
                </div>;
            })}
        </div>
    </div>;
};
