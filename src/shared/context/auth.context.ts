import { createContext } from 'react';
import { UserProps } from '../hooks/auth-hook';

export const AuthContext = createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    signin: (data: UserProps) => {
    },
    signout: () => {
    },
});
