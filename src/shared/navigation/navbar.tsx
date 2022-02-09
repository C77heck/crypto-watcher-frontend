import { Button } from '../components/button';

export const NavBar = (props: any) => {
    // we will need a list of pages to lead us to
    // we also need a hook to check on the current location.
    // then a switch case to handle all that.
    // TODO -> We will need out new layout techic here!!
    return <nav className="nav-bar display-flex">
        <ul className="nav-bar--ul flex-basis-70">
            <li>first</li>
            <li>second</li>
            <li>third</li>
        </ul>
        <Button buttonStyle={'login'} title={'Login'}/>
    </nav>;
};
