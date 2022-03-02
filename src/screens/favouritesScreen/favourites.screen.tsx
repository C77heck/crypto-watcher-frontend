import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../shared/components/spinner';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from '../components/header';
import { CryptoManager } from '../fluctuationScreen/components/crypto-manager';
import { WatchedCryptoProps } from '../watchlist/watchlist.screen';

export const FavouritesScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await request.get('/crypto/favourites', {}, {});
                    setWatched(response?.items || []);
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            })();
        }
    }, [isLoggedIn]);

    return <div>
        {isLoading && <Spinner asOverlay/>}
        <Header>
            <h2 className={'header--2'}>Favourites</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-mlg-33 col-xl-25 mt-25 cursor-pointer gap-30'}>
                    <CryptoManager data={data}/>
                </div>;
            })}
        </div>
    </div>;
};

