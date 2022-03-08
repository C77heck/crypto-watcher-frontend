import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../config/static-data';
import { LoginButton } from './login.button';

export const DesktopNavbar = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const getColor = useCallback((link: string) => {
        const genericClasses = 'text-decoration-none uppercase fs-mlg-17 fs-14 white-space-nowrap py-20 fw--700';
        return window.location.pathname === link
            ? `${genericClasses} text-color--active`
            : `${genericClasses}`;
    }, []);

    const { isLoggedIn } = props;

    return <nav className={`${props.className} nav-bar justify-content-center align-items-center`}>
        <div className={'row max-width-vw-85'}>
            <div className={'col-80 col-lg-60'}>
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
                        <Link className={getColor(favourites)} to={favourites}>
                            Favourites
                        </Link>
                    </li>}

                    <li className={'col-20'}>
                        <Link className={getColor(changesInValue)} to={changesInValue}>
                            Fluctuation
                        </Link>
                    </li>
                    {isLoggedIn && <li className={'col-20'}>
                        <Link className={getColor(newPurchase)} to={newPurchase}>
                            new purchase
                        </Link>
                    </li>}

                </ul>
            </div>
            <div className={'col-20 col-lg-40 display-flex justify-content-end'}>
                <LoginButton/>
            </div>
        </div>
    </nav>;
};
