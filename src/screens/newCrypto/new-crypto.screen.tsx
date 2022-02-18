import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = () => {
    const [options, setOptions] = useState([{}]);
    const { token } = useContext(AuthContext);
    const request = new Repository();
    request.setAuth(token);
    useEffect(() => {
        (async () => {
            const response = await request.get('/crypto/get_select_assets', {});
            console.log(response);
            setOptions(response?.assets || []);
        })();
    }, []);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'position-center mt-50'}>
            <div className={'fix-width-400'}>
                <NewCryptoForm options={options}/>
            </div>
        </div>
    </div>;
};
