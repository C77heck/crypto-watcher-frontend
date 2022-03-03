export const Content = (props: any) => {
    return <div className={`crypto-box min-height-200 ${props.className}`}>
        {props.children}
    </div>;
};
