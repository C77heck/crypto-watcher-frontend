import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../config/static-data';

export const MobileLinks = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const getColor = useCallback((link: string) => {
        return window.location.pathname === link ? 'text-color--active uppercase fs-17 white-space-nowrap' : 'fs-17 uppercase white-space-nowrap';
    }, []);

    const isLoggedIn = props;

    const isShow = props.show ? 'opened' : '';

    return <div className={`mobile-overlay w-100 mobile-menu ${isShow}`}>
        <div className={`mobile-overlay__left display-flex background-color--light flex-column align-items-baseline mobile-menu ${isShow}`}>
            <div className="display-flex align-items-center flex-column">
                <Link className={getColor(home)} to={home}>
                    Home
                </Link>
                {isLoggedIn && <Link className={getColor(watchlist)} to={watchlist}>
                    watchlist
                </Link>}
                {isLoggedIn && <Link className={getColor(newPurchase)} to={newPurchase}>
                    new purchase
                </Link>}
                <Link className={getColor(changesInValue)} to={changesInValue}>
                    Fluctuation
                </Link>
                {isLoggedIn && <Link className={getColor(favourites)} to={favourites}>
                    Favourites
                </Link>}
            </div>
        </div>
        <div
            onClick={props.onClick}
            className={`mobile-overlay__right display-flex background-color--dark-2 flex-column mobile-opacity ${isShow}`}
        />
    </div>;
};

