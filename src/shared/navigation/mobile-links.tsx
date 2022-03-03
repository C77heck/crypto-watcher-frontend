import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { staticData } from '../config/static-data';

export const MobileLinks = (props: any) => {
    const { links: { watchlist, newPurchase, changesInValue, home, favourites } } = staticData;

    const getColor = useCallback((link: string) => {
        const genericClasses = 'text-decoration-none uppercase fs-21 white-space-nowrap py-20 fw--700';
        return window.location.pathname === link
            ? `${genericClasses} text-color--active`
            : `${genericClasses}`;
    }, []);

    const { isLoggedIn } = props;

    const isShow = props.show ? 'opened' : '';

    return <div className={`mobile-overlay w-100 mobile-menu ${isShow}`}>
        <div className={`mobile-overlay__left pt-50 display-flex background-color--light flex-column align-items-baseline mobile-menu ${isShow}`}>
            <div className="display-flex align-items-start flex-column pl-20">
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

