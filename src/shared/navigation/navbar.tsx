export const NavBar = (props: any) => {
    // we will need a list of pages to lead us to
    // we also need a hook to check on the current location.
    // then a switch case to handle all that.

    return <nav className='nav-bar'>
        <ul className='nav-bar--ul'>
            <li>first</li>
            <li>second</li>
            <li>third</li>
            <li>fourth</li>
            <li>fifth</li>
        </ul>
    </nav>
}