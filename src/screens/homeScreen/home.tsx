import { Input } from "../../shared/form/input";
import { Header } from "../components/header";

export const Home = (props: any) => {

    return <div>
        <Header/>
        <Input
            validator={() => false}
            getData={(data: any) => console.log(data)}
            errorMessage={'whaaat?'}
        />
    </div>;
};
