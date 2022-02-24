import { useContext } from 'react';
import { ErrorScreen } from '../../screens/errorScreen/error.screen';
import { AuthContext } from '../context/auth.context';

export const Auth = (props: any) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? props.children : <ErrorScreen/>;
};
