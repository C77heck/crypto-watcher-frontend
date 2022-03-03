import { useState } from 'react';
import { LoginButton } from './login.button';
import { MobileLinks } from './mobile-links';
import { MobileMenuButton } from './mobile-menu.button';

export const MobileNavbar = (props: any) => {
    const [isActive, setIsActive] = useState(false);

    return <nav className="nav-bar position-center">
        <div className={'row max-width-vw-85 fix-height-50'}>
            <div className={'col-60'}>
                <MobileMenuButton isActive={isActive} onClick={() => setIsActive(!isActive)}/>
            </div>
            {isActive && false && <MobileLinks {...props}/>}
            <div className={'col-40 display-flex justify-content-end'}>
                <LoginButton/>
            </div>
        </div>
    </nav>;
};
