import { useEffect, useState } from 'react';
import { fetch } from '../../shared/libs/requests';
import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const { payload } = await fetch(`${process.env.REACT_APP_BASE_URL}/all_cryptos`, {});
            setOptions(payload.data);
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
