import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from '../components/header';
import { WatchedCryptoProps } from '../watchlist/watchlist.screen';
import { CryptoCard } from './components/crypto-card';

export const FluctuationScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn || !!shouldRefetch) {
            (async () => {
                try {
                    setIsLoading(true);
                    // request.setHeader('page', '1');
                    const response = await request.get('/crypto/get_changes_in_value', { query: [{ prop: 'page', value: '2' }] });
                    console.log(response?.items);

                    setWatched(response?.items || []);
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            })();
        }
    }, [isLoggedIn, shouldRefetch]);

    return <div>
        <Header>
            <h2 className={'header--2'}>Crypto fluctuation</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-mlg-33 col-xl-25 mt-25 cursor-pointer gap-30'}>
                    <CryptoCard data={data}/>
                </div>;
            })}
        </div>

    </div>;
};

