import { Link } from 'react-router-dom';
import { Portal } from '../components/portal';
import { staticData } from '../config/static-data';
import { LatestListings } from './latest-listings';
import { LoginButton } from './login.button';

export const NavBar = (props: any) => {
    const { links: { watchlist, newPurchase, profitCalculator } } = staticData;

    return <Portal elementId={'navbar'}>
        <nav className="nav-bar position-center">
            <div className={'row max-width-vw-85'}>
                <ul className="nav-bar--ul col-60">
                    <li><Link to={watchlist}>watchlist</Link></li>
                    <li><Link to={newPurchase}>new purchase</Link></li>
                    <li><Link to={profitCalculator}>profit calculator</Link></li>
                    <li><LatestListings/></li>
                </ul>
                <div className={'col-14'}>
                    <LoginButton/>
                </div>
            </div>
        </nav>
    </Portal>;
};
