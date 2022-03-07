import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { parseError } from '../libs/error-parsers';
import { Repository } from '../libs/repository';

export const useClient = () => {
    const { token, signout } = useContext(AuthContext);
    const request: any = new Repository(token);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const clearError = () => {
        setError('');
    };
    const client = async (url: string, method = 'get', options = {}, query: any = null) => {
        try {
            setIsLoading(true);
            const response = await manageRequest(url, method, options, query);
            setIsLoading(false);
            setSuccessMessage(response?.message || 'Success');

            return response;
        } catch (e: any) {
            if (e?.code === 401) {
                signout();
            }
            const error = parseError(e);
            setError(error);
            setIsLoading(false);
        }
    };

    const manageRequest = async (url: string, method: string, options: RequestInit, query: any) => {
        switch (method) {
            case 'get':
                return request.get(url, options, query);
            case 'post':
                return request.post(url, options, query);
            case 'put':
                return request.put(url, options, query);
            case 'patch':
                return request.patch(url, options, query);
            case 'delete':
                return request.delete(url, options, query);
            default:
                return request.get(url, options, query);
        }
    };

    return { client, isLoading, error, clearError, successMessage };
};
