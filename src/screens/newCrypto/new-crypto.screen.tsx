import { Input } from "../../shared/form/input";
import { onlyStringsValidator } from "../../shared/form/validators/only-strings-validator";
import { Header } from "../components/header";

export const NewCryptoScreen = (props: any) => {

    return <div>
        <Header/>

    </div>;
};

// <Input
//     validator={(data: any) => onlyStringsValidator(data)}
//     getData={(data: any, error: any) => console.log(data, error)}
//     errorMessage={'whaaat?'}
// />
