export const Content = (props: any) => {
    return <div className={`min-height-200 ${props.className}`}>
        {props.children}
    </div>;
};
