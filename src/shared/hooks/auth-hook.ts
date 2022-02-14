import { useState } from 'react';
import { Storage } from '../libs/storage';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const storage = new Storage('auth');
    const signout = () => {

    };
    const signin = (userData: any) => {
        setIsLoggedIn();
        setToken();
        setUserId();
        storage.set(userData);
    };
    return { isLoggedIn, token, userId, signout, signin };
};
