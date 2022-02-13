export interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    buttonStyle?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    title: string;
    children?: any;
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
        {!!props.children ? props.children : props.title}
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
        default:
            return 'button';
    }
};
