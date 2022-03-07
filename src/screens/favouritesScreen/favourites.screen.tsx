import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../shared/components/spinner';
import { AuthContext } from '../../shared/context/auth.context';
import { ErrorModal } from '../../shared/form/error-modal';
import { useClient } from '../../shared/hooks/client';
import { Header } from '../components/header';
import { CryptoManager } from '../fluctuationScreen/components/crypto-manager';
import { WatchedCryptoProps } from '../watchlist/watchlist.screen';

export const FavouritesScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [fetchList, setFetchList] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const { isLoading, error, clearError, client } = useClient();

    useEffect(() => {
        if (isLoggedIn || fetchList) {
            (async () => {
                const response: any = await client('/crypto/favourites', 'get', {}, {});
                setWatched(response?.items || []);
            })();
        }
    }, [isLoggedIn, fetchList]);

    return <div>
        {isLoading && <Spinner asOverlay/>}
        <ErrorModal
            show={!!error}
            errorMessage={error}
            onClick={clearError}
        />
        <Header>
            <h2 className={'header--2'}>Favourites</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-lg-33 col-xl-25 mt-25 cursor-pointer gap-30'}>
                    <CryptoManager isFavouriteScreen={true} fetchList={() => setFetchList(!fetchList)} data={data}/>
                </div>;
            })}
        </div>
    </div>;
};

