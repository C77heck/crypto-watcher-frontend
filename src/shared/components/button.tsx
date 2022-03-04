import { SpinnerIcon } from './icons';

export interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    buttonStyle?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    title: string;
    isLoading?: boolean;
    textColor?: string;
}

export const Button = (props: ButtonProps) => {
    return <button
        type={props.type || 'button'}
        className={`${getButtonType(props.buttonStyle || '')} ${props.className} position-center`}
        name={props.name}
        id={props.id}
        disabled={props.disabled}
        onClick={props.onClick}
    >

        {props.isLoading
            ? <span className={`${props.textColor} fs-13 display-flex`}><SpinnerIcon width={15}/><span className={'pl-10 pt-1'}>Loading...</span></span>
            : <span className={`${props.textColor}`}>{props.title}</span>}
    </button>;
};

const getButtonType = (type: string) => {
    switch (type) {
        case 'base':
            return 'button button--base';
        case 'submit':
            return 'button button--submit';
        case 'login':
            return 'button button--login';
        case 'logout':
            return 'button button--logout';
        case 'success':
            return 'button button--success';
        case 'error':
            return 'button button--error';
        case 'delete':
            return 'button button--delete';
        default:
            return 'button';
    }
};
