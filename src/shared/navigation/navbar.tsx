import { Link } from 'react-router-dom';
import { Portal } from '../components/portal';
import { staticData } from '../config/static-data';
import { LatestListings } from './latest-listings';
import { LoginButton } from './login.button';

const getColor = (link: string) => {
    return window.location.pathname === link ? 'text-color--active' : '';
};

export const NavBar = (props: any) => {
    const { links: { watchlist, newPurchase, profitCalculator } } = staticData;

    return <Portal elementId={'navbar'}>
        <nav className="nav-bar position-center">
            <div className={'row max-width-vw-85'}>
                <ul className="nav-bar--ul col-60">
                    <li>
                        <Link
                            className={getColor(watchlist)}
                            to={watchlist}
                        >
                            watchlist
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={getColor(newPurchase)}
                            to={newPurchase}
                        >
                            new purchase
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={getColor(profitCalculator)}
                            to={profitCalculator}
                        >
                            profit calculator
                        </Link>
                    </li>
                    <li><LatestListings/></li>
                </ul>
                <div className={'col-14'}>
                    <LoginButton/>
                </div>
            </div>
        </nav>
    </Portal>;
};
