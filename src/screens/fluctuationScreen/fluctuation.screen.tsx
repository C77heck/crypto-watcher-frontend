import { useContext, useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { Spinner } from '../../shared/components/spinner';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from '../components/header';
import { WatchedCryptoProps } from '../watchlist/watchlist.screen';
import { CryptoManager } from './components/crypto-manager';
import { Paginator } from './components/paginator';
import { SearchBar } from './components/search-bar';

export const FluctuationScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn || page || search) {
            console.log('HEY');
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await request.get('/crypto/get_changes_in_value', {}, { page, search });
                    setTotal(response?.total || 0);
                    setWatched(response?.items || []);
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            })();
        }
    }, [isLoggedIn, page, search]);

    const paginate = (page: number) => {
        setPage(page);
    };

    const [onSearch$] = useState(() => new Subject());
    useEffect(() => {
        const subscription = onSearch$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            tap(a => console.log(a))
        ).subscribe(setSearch as any);

        return () => subscription.unsubscribe();
    }, []);

    const onChangeHandler = (value: string) => {
        onSearch$.next(value);
    };

    return <div>
        {isLoading && <Spinner asOverlay/>}
        <div className={'max-width-vw-80 margin-auto display-flex justify-content-end'}>
            <SearchBar onSearch={onChangeHandler}/>
        </div>
        <Header>
            <h2 className={'header--2'}>Crypto fluctuation</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-mlg-33 col-xl-25 mt-25 cursor-pointer gap-30'}>
                    <CryptoManager data={data}/>
                </div>;
            })}
        </div>
        <Paginator currentPage={page} fetchPage={(data: number) => paginate(data)} total={total}/>
    </div>;
};

