import { Auth } from '../../shared/components/Auth';
import { NavBar } from '../../shared/navigation/navbar';

export const BaseLayout = (props: any) => {

    return <div className={'min-width-vw-100 min-height-vh-100'}>
        <NavBar/>
        <Auth>
            {props.children}
        </Auth>
    </div>;
};
