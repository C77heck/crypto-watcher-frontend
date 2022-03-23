import * as React from 'react';
import { useContext, useState } from 'react';
import { Button } from '../components/button';
import { LoginIcon, LogoutIcon } from '../components/icons';
import { Modal } from '../components/modal';
import { AuthContext } from '../context/auth.context';
import { LoginForm } from "./login.form";
import { RegisterForm } from "./register.form";

export const LoginButton = ({ isMobile }: any) => {
    const { signout, isLoggedIn } = useContext(AuthContext);
    const [isRegister, setIsRegister] = useState(false);

    if (isLoggedIn) {
        return <Button
            textColor={'text-color--light-1 fs-mlg-17 fs-16'}
            buttonStyle={isMobile ? 'logout--mobile' : 'logout'}
            title={isMobile ? <LogoutIcon width={30} className={'text-color--light-1 pt-9 pl-8'}/> : 'Logout'}
            onClick={() => signout()}
        />;
    }

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={isRegister
            ? <RegisterForm onClick={() => setIsRegister(false)}/>
            : <LoginForm onClick={() => setIsRegister(true)}/>}
        size={{ sm: 90, md: 72, lg: 60, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        wrapperClass={'align-self-center'}
        trigger={<Button
            textColor={'text-color--light-1 fs-mlg-17 fs-16'}
            buttonStyle={isMobile ? 'login--mobile' : 'login'}
            title={isMobile ? <LoginIcon width={27} className={'text-color--light-1 pt-3'}/> : 'Login'}
        />}
    />;
};
