import { useEffect, useState } from 'react';
import { fetch } from '../../shared/libs/requests';
import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = () => {
    const [options, setOptions] = useState([{}]);

    useEffect(() => {
        (async () => {
            const { payload } = await fetch(`/crypto/get_select_assets`, {});

            setOptions(payload?.assets || []);
        })();
    }, []);

    return <div>
        <Header>
            <h2 className={'header--2'}>Add new purchase</h2>
        </Header>
        <div className={'position-center mt-50'}>
            <NewCryptoForm options={options}/>
        </div>
    </div>;
};
