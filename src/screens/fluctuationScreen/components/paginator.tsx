import { getClasses } from '../../../shared/libs/helpers';

export const Paginator = (props: any) => {
    const { total, currentPage } = props;
    const { firstPart, middlePart, endPart } = getPaginationMaőp(total, currentPage);

    return <div className={'position-center'}>
        {(firstPart || []).map(item => <Option {...props} item={item}/>)}
        {(middlePart || []).map(item => <Option {...props} item={item}/>)}
        {(endPart || []).map(item => <Option {...props} item={item}/>)}
    </div>;
};

const Option = ({ fetchPage, item, currentPage }: any) => {
    const classes = getClasses(currentPage === item, 'color-green--light');
    return <a className={`fs-34 cursor-pointer hover-opacity ${classes}`} onClick={() => fetchPage(item)}>{item + 1}</a>;
};

interface PaginationProps {
    firstPart: number[];
    middlePart: number[];
    endPart: number[];
}

const getPaginationMaőp = (options: number, currentOption: number): PaginationProps => {
    // need to figure the logic. take it from
    const firstPart = currentOption - 4; // 4 numbers to show
    const middlePart = currentOption - 4; // 4 numbers to show
    const endPart = currentOption - 4; // 4 numbers to show

    return { firstPart: [1], middlePart: [2], endPart: [3] };
};
