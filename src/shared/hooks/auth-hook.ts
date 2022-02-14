import { useEffect, useState } from 'react';
import { Storage } from '../libs/storage';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const storage = new Storage('auth');

    useEffect(() => {
        const data = storage.get();
        if (data) {
            signin(data);
        }
    });

    const signout = () => {
        storage.remove();
        setIsLoggedIn(false);
        setToken(null);
        setUserId(null);
    };

    // TODO -> Will need an expiry ddate. make sure to use my own date manager.
    const signin = (userData: any) => {
        setIsLoggedIn(true);
        setToken(userData?.token);
        setUserId(userData?.userId);
        storage.set({ ...userData });
    };

    return { isLoggedIn, token, userId, signout, signin };
};
