export const Backdrop = (props: any) => {
    return <div className={`${props.className} z-100 backdrop`}>{props.children && props.children}</div>;
};
