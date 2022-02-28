import { getClasses, numArray } from '../../../shared/libs/helpers';

export const Paginator = (props: any) => {
    const { total, currentPage, fetchPage } = props;
    const { startDot, startDotRef, start, endDot, endDotRef, end, middle } = getPaginationMap(total, currentPage);
    console.log(getPaginationMap(total, currentPage));
    const numTotal = parseInt(total, 10);
    const numLimit = 100;
    const totalPage = total;
    const shouldPrevBeDisabled = currentPage > 0 ? 'hover-primary' : 'color--black-3';
    const shouldNextBeDisabled = currentPage < totalPage - 1 && totalPage !== 1 ? 'hover-primary' : 'color--black-3';

    const prevHref = () => currentPage > 0 && fetchPage(currentPage - 1);
    const nextHref = () => currentPage < totalPage && totalPage !== 1 && fetchPage(currentPage + 1);
    const firstHref = () => currentPage > 0 && fetchPage(0);
    const lastHref = () => currentPage < totalPage && fetchPage(end);

    return <div className={'position-center py-60'}>
        <p className={'fs-25 px-10 cursor-pointer hover-opacity'} onClick={firstHref}>{'<='}</p>
        <p className={'fs-25 px-10 cursor-pointer hover-opacity'} onClick={prevHref}>{'<-'}</p>
        <Option {...props} isDot={true} item={start}/>
        {startDot && <Option {...props} item={startDotRef}/>}
        {(middle || []).map(item => <Option {...props} item={item}/>)}
        {endDot && <Option {...props} item={endDotRef}/>}
        <Option {...props} isDot={true} item={end}/>
        <p className={'fs-25 px-10 cursor-pointer hover-opacity'} onClick={nextHref}>{'->'}</p>
        <p className={'fs-25 px-10 cursor-pointer hover-opacity'} onClick={lastHref}>{'=>'}</p>
    </div>;
};

const Option = ({ fetchPage, item, currentPage, isDot }: any) => {
    const classes = getClasses(currentPage === item, 'color-green--light');
    return <a className={`fs-34 cursor-pointer hover-opacity ${classes}`} onClick={() => fetchPage(item)}>{!isDot ? item : '...'}</a>;
};

interface PaginationProps {
    firstPart: number[];
    middlePart: number[];
    endPart: number[];
}

interface PaginationProp {
    startDot: boolean;
    startDotRef: number | boolean;
    start: number | null;
    endDot: number | boolean;
    endDotRef: number | boolean;
    end: number | null;
    middle: any[] | null;
}

export const getPaginationMap = (total: number, page: number = 1): PaginationProp => {

    if (total === 0) {
        return {
            startDot: false,
            startDotRef: false,
            start: null,
            endDot: false,
            endDotRef: false,
            middle: [],
            end: null,
        };
    }
    const pages = numArray(total);
    const start = pages[0];
    const end = pages[pages.length - 1];

    if (pages.length <= 7) {
        return {
            startDot: false,
            startDotRef: false,
            start: start,
            endDot: false,
            endDotRef: false,
            middle: pages.slice(1, pages.length - 1),
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
