import { BarsIcon } from '../components/icons';

export const MobileMenuButton = (props: any) => {
    const isActive = props.isActive ? 'color-custom--secondary-3' : 'color-custom--grey';
    return <BarsIcon
        onClick={props.onClick}
        className={`display-flex cursor-pointer h-100 hover-opacity ${isActive}`}
        width={30}
    />;
};
