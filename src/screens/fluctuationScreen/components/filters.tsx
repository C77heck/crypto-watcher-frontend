import {useState} from "react";


export const Filters = ({tags}: { tags: any[] }) => {
    const [activeTag, setActiveTag] = useState('');
    return <div className={'display-flex align-items-end justify-content-end'}>
        {(tags || []).map(tag => <Filter activeTag={activeTag} data={tag} onClick={() => setActiveTag(tag)}/>)}
    </div>
}

interface FilterProps {
    data: string;
    onClick: () => void;
    activeTag: string;
}

const Filter = (props: FilterProps) => {
    const tag = props?.data || '';
    const stateClass = tag === props.activeTag ? 'active' : 'inactive';
    return <div
        className={`position-center filter-button filter-button--${stateClass} hover-opacity`}
        onClick={props.onClick}
    >
        <p className={'fs-16 fw--700 px-10 py-5 white-space-nowrap'}>{tag}</p>
    </div>
}