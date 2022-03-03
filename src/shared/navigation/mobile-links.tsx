import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../config/static-data';

export const MobileLinks = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const getColor = useCallback((link: string) => {
        return window.location.pathname === link ? 'text-color--active uppercase fs-17 white-space-nowrap' : 'fs-17 uppercase white-space-nowrap';
    }, []);

    const isLoggedIn = props;
    return <ul className="nav-bar--ul row">
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
    </ul>;
};
