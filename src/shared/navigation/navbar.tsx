import { Link } from 'react-router-dom';
import { Button } from '../components/button';
import { staticData } from '../config/static-data';

export const NavBar = (props: any) => {
    const { links: { watchlist, newPurchase, profitCalculator } } = staticData;
    // we will need a list of pages to lead us to
    // we also need a hook to check on the current location.
    // then a switch case to handle all that.

    return <nav className="nav-bar position-center">
        <div className={'row max-width-vw-85'}>
            <ul className="nav-bar--ul col-40">
                <li><Link to={watchlist}>watchlist</Link></li>
                <li><Link to={newPurchase}>new purchase</Link></li>
                <li><Link to={profitCalculator}>profit calculator</Link></li>
            </ul>
            <div className={'col-14'}>
                <Button buttonStyle={'login'} title={'Login'}/>
            </div>
        </div>
    </nav>;
};
