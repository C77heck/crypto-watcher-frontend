export const Tab = (props: any) => {
    return <div
        className={`position-center p-10 ${props.className}`}
        onClick={props.onClick}
    >
        <span className={'fs-18 fw--600'}>{props.title}</span>
    </div>;
};
