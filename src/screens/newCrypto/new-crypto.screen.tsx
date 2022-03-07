import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { useClient } from '../../shared/hooks/client';
import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = () => {
    const [options, setOptions] = useState([{}]);
    const { isLoggedIn } = useContext(AuthContext);
    const { client, isLoading } = useClient();

    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                const response: any = await client('/crypto/get_select_assets', 'get', {});
                setOptions(response?.assets || []);
            })();
        }
    }, [isLoggedIn]);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'position-center mt-50'}>
            <div className={'fix-width-400'}>
                <NewCryptoForm options={options} onSuccess={() => window.location.reload()}/>
            </div>
        </div>
    </div>;
};
