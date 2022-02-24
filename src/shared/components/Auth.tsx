import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

export const Auth = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? props.children : null;
};
