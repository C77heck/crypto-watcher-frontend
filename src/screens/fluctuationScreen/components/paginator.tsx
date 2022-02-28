import { getClasses, numArray } from '../../../shared/libs/helpers';

export const Paginator = (props: any) => {
    const { total, currentPage } = props;
    const { firstPart, middlePart, endPart } = getPaginationMaőp(total, currentPage);
    console.log(getPaginationMap(total, currentPage));
    return <div className={'position-center py-60'}>
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

export const getPaginationMap = (total: number, page: number = 1, limit: number = 100) => {

    if (total === 0) {
        return {
            startDot: false,
            start: null,
            middle: [],
            endDot: false,
            end: null
        };
    }
    const pages = numArray(total);
    const start = pages[0];
    const end = pages[pages.length - 1];

    if (pages.length <= 7) {
        return {
            startDot: false,
            start: start,
            middle: pages.slice(1, pages.length - 1),
            endDot: false,
            end: end
        };
    }
    const middle = getMiddlePaginatorValues(pages, page);

    return {
        start: start,
        startDot: pages.length > 7 && page > 2,
        startDotRef: middle[0] - 1,
        middle: middle,
        endDot: pages.length > 7 && page <= pages.length - 5,
        endDotRef: middle[middle.length - 1] + 1,
        end: end
    };
};

const getMiddlePaginatorValues = (pages: number[], page: number): number[] => {
    const trimmedPages = pages.map(i => i);
    trimmedPages.pop();
    trimmedPages.shift();

    if (page === 0) {
        return trimmedPages.slice(0, page + 4);
    }
    if (page === 1) {
        return trimmedPages.slice(page - 1, page + 2);
    }
    if (page === pages.length - 1) {
        return trimmedPages.slice(page - 4, page);
    }
    if (page > pages.length - 4) {
        return trimmedPages.slice(page - 3, page + 1);
    }

    return trimmedPages.slice(page - 2, page + 2);
};
