import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Portal } from '../components/portal';
import { staticData } from '../config/static-data';
import { AuthContext } from '../context/auth.context';
import { Repository } from '../libs/repository';
import { LoginButton } from './login.button';

const getColor = (link: string) => {
    return window.location.pathname === link ? 'text-color--active uppercase fs-17 white-space-nowrap' : 'fs-17 uppercase white-space-nowrap';
};

export const NavBar = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const [shouldRefetch, setShouldRefetch] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn || !!shouldRefetch) {
            (async () => {
                try {
                    console.log('Pulling the latest data...');
                    // await request.get('/crypto/latest_listings', {});
                    console.log('Pulling the latest data was successful');
                } catch (e) {
                    console.log('Pulling the latest data was unsuccussfull');
                }
            })();
        }
    }, [isLoggedIn, shouldRefetch]);

    useEffect(() => {
        const timer = setInterval(() => setShouldRefetch(!shouldRefetch), 1000 * 60 * 3);
        return () => clearInterval(timer);
    }, [shouldRefetch]);

    return <Portal elementId={'navbar'}>
        <nav className="nav-bar position-center">
            <div className={'row max-width-vw-85'}>
                <div className={'col-60'}>
                    <ul className="nav-bar--ul row">
                        <li className={'col-20'}>
                            <Link className={getColor(home)} to={home}>
                                Home
                            </Link>
                        </li>
                        {isLoggedIn && <li className={'col-20'}>
                            <Link className={getColor(watchlist)} to={watchlist}>
                                watchlist
                            </Link>
                        </li>}
                        {isLoggedIn && <li className={'col-20'}>
                            <Link className={getColor(newPurchase)} to={newPurchase}>
                                new purchase
                            </Link>
                        </li>}
                        <li className={'col-20'}>
                            <Link className={getColor(changesInValue)} to={changesInValue}>
                                Fluctuation
                            </Link>
                        </li>
                        {isLoggedIn && <li className={'col-20'}>
                            <Link className={getColor(favourites)} to={favourites}>
                                Favourites
                            </Link>
                        </li>}
                    </ul>
                </div>
                <div className={'col-40 display-flex justify-content-end'}>
                    <LoginButton/>
                </div>
            </div>
        </nav>
    </Portal>;
};
