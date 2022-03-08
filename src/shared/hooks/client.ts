import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { parseError } from '../libs/error-parsers';
import { Repository } from '../libs/repository';

export interface ClientProps {
    isLoading: boolean;
    error: string;
    clearError: () => void;
    successMessage: string;
    clearMessage: () => void;
    client: (url: string, method: string, options?: RequestInit, query?: any) => void;
}

export const useClient = (): ClientProps => {
    const { token, signout } = useContext(AuthContext);
    const request: any = new Repository(token);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const clearError = () => {
        setError('');
    };
    const clearMessage = () => {
        setSuccessMessage('');
    };
    const client = async (url: string, method: string, options?: RequestInit, query?: any) => {
        try {
            setIsLoading(true);
            const response: any = await request.fetch(url, method, options, query);
            setIsLoading(false);
            setSuccessMessage(response?.message || 'Success');

            return response;
        } catch (e: any) {
            if (e?.code === 401) {
                signout();
            } else {
                const error = parseError(e);
                setError(error);
            }

            setIsLoading(false);
        }
    };

    return { client, isLoading, error, clearError, successMessage, clearMessage };
};
