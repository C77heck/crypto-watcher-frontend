import { Auth } from '../../shared/components/Auth';
import { NavBar } from '../../shared/navigation/navbar';

export const BaseLayout = (props: { auth?: boolean; children: any; }) => {

    return <div className={'min-width-vw-100 min-height-vh-100'}>
        <NavBar/>
        {props.auth ? <Auth>{props.children}</Auth> : props.children}
    </div>;
};
