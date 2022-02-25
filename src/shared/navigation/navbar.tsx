import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Portal } from '../components/portal';
import { staticData } from '../config/static-data';
import { AuthContext } from '../context/auth.context';
import { LoginButton } from './login.button';

const getColor = (link: string) => {
    return window.location.pathname === link ? 'text-color--active uppercase fs-17' : 'fs-17 uppercase';
};

export const NavBar = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { links: { watchlist, newPurchase, changesInValue, home } } = staticData;

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
                        {isLoggedIn && <li className={'col-22'}>
                            <Link className={getColor(watchlist)} to={watchlist}>
                                watchlist
                            </Link>
                        </li>}
                        {isLoggedIn && <li className={'col-25'}>
                            <Link className={getColor(newPurchase)} to={newPurchase}>
                                new purchase
                            </Link>
                        </li>}
                        {isLoggedIn && <li className={'col-33'}>
                            <Link className={getColor(changesInValue)} to={changesInValue}>
                                Crypto fluctuation
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
