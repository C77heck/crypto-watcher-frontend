import { useEffect, useState } from 'react';
import { fetch } from '../../shared/libs/requests';
import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const { payload } = await fetch(`/get_select_assets`, {});
            console.log(payload?.assets || []);
            setOptions(payload?.assets || ['something', 'another thing']);
        })();
    }, []);

    return <div>
        <Header/>
        <div className={'position-center min-height-vh-78'}>
            <NewCryptoForm options={options}/>
        </div>
    </div>;
};

// <Input
//     validator={(data: any) => onlyStringsValidator(data)}
//     getData={(data: any, error: any) => console.log(data, error)}
//     errorMessage={'whaaat?'}
// />
