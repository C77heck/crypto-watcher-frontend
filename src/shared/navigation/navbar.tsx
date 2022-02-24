import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Portal } from '../components/portal';
import { staticData } from '../config/static-data';
import { AuthContext } from '../context/auth.context';
import { LatestListings } from './latest-listings';
import { LoginButton } from './login.button';

const getColor = (link: string) => {
    return window.location.pathname === link ? 'text-color--active' : '';
};

export const NavBar = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { links: { watchlist, newPurchase, profitCalculator, home } } = staticData;

    return <Portal elementId={'navbar'}>
        <nav className="nav-bar position-center">
            <div className={'row max-width-vw-85'}>
                <div className={'col-60'}>
                    <ul className="nav-bar--ul row">
                        <li className={'col-25'}>
                            <Link className={getColor(home)} to={home}>
                                Home
                            </Link>
                        </li>
                        {isLoggedIn && <li className={'col-25'}>
                            <Link className={getColor(watchlist)} to={watchlist}>
                                watchlist
                            </Link>
                        </li>}
                        {isLoggedIn && <li className={'col-25'}>
                            <Link className={getColor(newPurchase)} to={newPurchase}>
                                new purchase
                            </Link>
                        </li>}
                        <li className={'col-25'}><LatestListings/></li>
                    </ul>
                </div>
                <div className={'col-40 display-flex justify-content-end'}>
                    <LoginButton/>
                </div>
            </div>
        </nav>
    </Portal>;
};
