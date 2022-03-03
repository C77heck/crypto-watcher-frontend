import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../config/static-data';

export const MobileLinks = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const getColor = useCallback((link: string) => {
        return window.location.pathname === link ? 'text-color--active uppercase fs-17 white-space-nowrap' : 'fs-17 uppercase white-space-nowrap';
    }, []);

    const isLoggedIn = props;
    return <div className={'mobile-navbar'}>
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
    </div>;
};
const Test = (props: any) => {
    return <div className="container-fluid mobile-overlay w-100 mobile-overlay--up MobileMenuMenu opened">
        <div className="mobile-overlay__left display-flex flex-column align-items-baseline background-color--black-2 MobileMenuMenu opened">
            <div className="display-flex align-items-center flex-column">
                <Link className={getColor(home)} to={home}>
                    Home
                </Link>
                <Link className={getColor(watchlist)} to={watchlist}>
                    watchlist
                </Link>
                <Link className={getColor(newPurchase)} to={newPurchase}>
                    new purchase
                </Link>
                <Link className={getColor(changesInValue)} to={changesInValue}>
                    Fluctuation
                </Link>
                {isLoggedIn && <Link className={getColor(favourites)} to={favourites}>
                    Favourites
                </Link>}
            </div>
        </div>
        <div className="mobile-overlay__right display-flex flex-column background-color--mobile-right-1 MobileMenuToggle MobileOpacity display-none opened"/>
    </div>;
};
