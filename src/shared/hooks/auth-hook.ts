import { useState } from 'react';
import { Storage } from '../libs/storage';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const storage = new Storage('auth');
    const signout = () => {
        storage.remove();
        setIsLoggedIn(false);
        setToken(null);
        setUserId(null);
    };

    const signin = (userData: any) => {
        setIsLoggedIn(true);
        setToken(userData?.token);
        setUserId(userData?.userId);
        storage.set(userData);
    };

    return { isLoggedIn, token, userId, signout, signin };
};
