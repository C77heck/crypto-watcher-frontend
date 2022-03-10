import {useContext, useEffect, useState} from 'react';
import {debounceTime, distinctUntilChanged, Subject, tap} from 'rxjs';
import {Spinner} from '../../shared/components/spinner';
import {AuthContext} from '../../shared/context/auth.context';
import {ErrorModal} from '../../shared/form/error-modal';
import {useClient} from '../../shared/hooks/client';
import {Header} from '../components/header';
import {WatchedCryptoProps} from '../watchlist/watchlist.screen';
import {CryptoManager} from './components/crypto-manager';
import {Paginator} from './components/paginator';
import {SearchBar} from './components/search-bar';
import {Filters} from "./components/filters";

export const FluctuationScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const {isLoggedIn} = useContext(AuthContext);
    const {isLoading, error, clearError, client} = useClient();

    useEffect(() => {
        if (isLoggedIn || page || search) {
            (async () => {
                const response: any = await client('/crypto/get_changes_in_value', 'get', {}, {page, search});
                setTotal(response?.total || 0);
                setWatched(response?.items || []);
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
        <ErrorModal
            show={!!error}
            errorMessage={error}
            onClick={clearError}
        />
        <div className={'max-width-vw-80 margin-auto display-flex justify-content-end'}>
            <div className={'row justify-content-space-between'}>
                <div className={'col-40 display-flex'}><Filters/></div>
                <div className={'col-40'}><SearchBar onSearch={onChangeHandler}/></div>
            </div>
        </div>
        <Header>
            <h2 className={'header--2'}>Crypto fluctuation</h2>
        </Header>
        <div className={'position-center mt-50 max-width-vw-80 margin-auto row'}>
            {(watched || []).map((data: WatchedCryptoProps, index: number) => {
                return <div key={index} className={'col-100 col-md-50 col-lg-33 col-xl-25 mt-25 cursor-pointer gap-30'}>
                    <CryptoManager data={data}/>
                </div>;
            })}
        </div>
        <Paginator currentPage={page} fetchPage={(data: number) => paginate(data)} total={total}/>
    </div>;
};

