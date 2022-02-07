export const Button = (props: any) => {

    return <button
        type={props.type}
        className={props.className}
    >
        {!!props.children ? props.children : props.title}
    </button>;
};
