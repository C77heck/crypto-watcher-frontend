import { ArrowLeft, ArrowRight } from '../../../shared/components/icons';
import { getClasses, numArray } from '../../../shared/libs/helpers';

export const Paginator = (props: any) => {
    const { total, currentPage, fetchPage } = props;
    const { startDot, startDotRef, start, endDot, endDotRef, end, middle } = getPaginationMap(total, currentPage);
    console.log(getPaginationMap(total, currentPage));
    const shouldPrevBeDisabled = currentPage > 0 ? 'hover-primary' : 'color--black-3';
    const shouldNextBeDisabled = currentPage < total - 1 && total !== 1 ? 'hover-primary' : 'color--black-3';

    const prevHref = () => currentPage > 0 && fetchPage(currentPage - 1);
    const nextHref = () => currentPage < total && total !== 1 && fetchPage(currentPage + 1);

    return <div className={'position-center py-60'}>
        <ArrowLeft width={20} className={'px-10 cursor-pointer hover-opacity'} onClick={prevHref}/>
        <Option {...props} item={start}/>
        {startDot && <Option {...props} isDot={true} item={startDotRef}/>}
        {(middle || []).map(item => <Option {...props} item={item}/>)}
        {endDot && <Option {...props} isDot={true} item={endDotRef}/>}
        <Option {...props} item={end}/>
        <ArrowRight width={20} className={'px-10 cursor-pointer hover-opacity'} onClick={nextHref}/>

    </div>;
};

const Option = ({ fetchPage, item, currentPage, isDot }: any) => {
    const classes = getClasses(currentPage === item, 'color-green--light');
    return <a className={`fs-34 px-12 cursor-pointer hover-opacity ${classes}`} onClick={() => fetchPage(item)}>{!isDot ? item : '...'}</a>;
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
