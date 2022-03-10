import {useEffect, useState} from "react";
import {useClient} from "../../../shared/hooks/client";

interface FiltersProp {
    onClick: (tag: string) => void;
    tags: any[];
    activeTag: string;
}

export const Filters = ({tags, onClick, activeTag}: FiltersProp) => {

    return <div className={'display-flex align-items-end justify-content-end flex-wrap'}>
        {(tags || []).map(tag => <Filter activeTag={activeTag} data={tag} onClick={() => onClick(tag)}/>)}
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
        className={`position-center filter-button filter-button--${stateClass} hover-opacity m-4`}
        onClick={props.onClick}
    >
        <p className={'fs-16 fw--700 px-10 py-5 white-space-nowrap'}>{tag}</p>
    </div>
}