import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { fetch, getAuthHeader } from '../../shared/libs/requests';
import { Header } from "../components/header";

export interface WatchedCryptoProps {
    date: Date;
    first: any;
    second: any;
    third: any;
    price: number;
    symbol: string;
    name: string;
}

export const WatchlistScreen = () => {
    const [watched, setWatched] = useState([]);
    const { token } = useContext(AuthContext);
    useEffect(() => {
        (async () => {
            const { payload } = await fetch(`/crypto/should_sell`, { headers: [getAuthHeader(token)] });
            console.log(payload?.items || []);
            //  setOptions(payload?.assets || ['something', 'another thing']);
            setWatched(payload?.items || []);
        })();
    }, []);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'position-center mt-50'}>d
            {(watched || []).map((w: WatchedCryptoProps) => <h3>fuck it</h3>)}
        </div>
    </div>;
};
