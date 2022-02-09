import { Header } from "../components/header";
import { NewCryptoForm } from './components/new-crypto.form';

export const NewCryptoScreen = (props: any) => {

    return <div>
        <Header/>
        <div className={'position-center min-height-vh-78'}>
            <NewCryptoForm/>
        </div>
    </div>;
};

// <Input
//     validator={(data: any) => onlyStringsValidator(data)}
//     getData={(data: any, error: any) => console.log(data, error)}
//     errorMessage={'whaaat?'}
// />
