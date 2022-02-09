export const Button = (props: any) => {
    return <button
        type={props.type || 'button'}
        className={getButtonType(props.className)}
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
        default:
            return 'button';
    }
};
