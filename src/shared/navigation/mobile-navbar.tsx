import { Fragment, useState } from 'react';
import { LoginButton } from './login.button';
import { MobileLinks } from './mobile-links';
import { MobileMenuButton } from './mobile-menu.button';

export const MobileNavbar = (props: any) => {
    const [isActive, setIsActive] = useState(false);

    return <Fragment>
        <nav className={`${props.className} nav-bar justify-content-center align-items-center`}>
            <div className={'row px-20 px-md-80 fix-height-50'}>
                <div className={'col-60'}>
                    <MobileMenuButton isActive={isActive} onClick={() => setIsActive(!isActive)}/>
                </div>
                <div className={'col-40 display-flex justify-content-end align-items-center'}>
                    <LoginButton isMobile={true}/>
                </div>
            </div>
        </nav>
        <MobileLinks onClick={() => setIsActive(false)} {...props} show={isActive}/>
    </Fragment>;
};
