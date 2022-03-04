import { getUniqueId } from '../../../shared/libs/helpers';

interface PathProps {
    id: string;
    prevM1: number;
    prevM2: number;
    prevL1: number;
    prevL2: number;
    l1: number;
    l2: number;
}

interface PathDrawProps {
    id: string;
    m1: number;
    m2: number;
    l1: number;
    l2: number;
}

// M1 = prevM1 prevL1
// M2 = prevM2 prevL2
interface PriceProps {
    from: number;
    to: number;
    l1: number;
}

export const Graph = (props: any) => {
    // we will have 7 data points including the current price
    // the second number will be the hight of the previous one. but should draw down or upwards.
    // we need to determine the coordinate point of each data points then draw the line relative to them.
    // the first point is the 90 days the second point is the 60 days then we determine their connection
    // M1 will be fixed.
    // L1 will be dependent on M2 so that the length wills stay the same.
    // M2 will collerate to the previous L2
    // L2 will yield determine the slope up or down. minus is up the positive is down.
    const startl1 = 24;
    const startl2 = 10;
    const priceArr = [{ from: 13, to: 22, l1: 17 }, { from: 22, to: 32, l1: 17 }, { from: 22, to: 32, l1: 17 }, { from: 16, to: 20, l1: 17 }, { from: 20, to: 36, l1: 17 }, { from: 20, to: 36, l1: 17 }];

    const paths: PathDrawProps[] = formatPathDraw(calculatePath(priceArr));
    console.log(paths);
    return <svg viewBox="0 0 100 50">
        {paths.slice(0, 3).map(path => <Path key={path.id} {...path}/>)}
        {/*<path d="M 0 0 l 24 10" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 24 10 l 24 20" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 48 20 l 24 30" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 70 30 l 22 40" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 85 40 l 15 50" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 93 50 l 8 60" stroke="orangered" fill="none" stroke-width="1"/>*/}
    </svg>;
};

const formatPathDraw = (itemsToFormat: PathProps[]): PathDrawProps[] => {
    return itemsToFormat.map((item, index) => {
        return {
            id: item.id, l1: item.l1, l2: item.l2,
            m1: item.prevL1 + item.prevM1,
            m2: item.prevL2 + item.prevM2,
        };
    });
};

const calculatePath = (priceArr: PriceProps[]): PathProps[] => {

    const firstRound = priceArr.map(({ from, to, l1 }, index) => {
        const l2 = (from - to) * -1;

        return {
            l1, l2,
            id: getUniqueId(),
        };
    });
    let m1Val = 0;
    let m2Val = 0;

    return firstRound.map(({ l1, l2, id }, index) => {
        m1Val += l1;
        m2Val += l2;
        return {
            l1, l2, id,
            prevM1: !!index ? getPrevValues(firstRound, index, 'l1', m1Val) : 0,
            prevM2: !!index ? getPrevValues(firstRound, index, 'l2', m2Val) : 0,
            prevL1: !!index ? getPrevValues(firstRound, index, 'l1') : l1,
            prevL2: !!index ? getPrevValues(firstRound, index, 'l2') : l2,
        };
    });
};

const getPrevValues = (array: any[], index: number, property: string, secProp = 0): number => {
    console.log(property, array[index - 1][property], array, secProp);
    return array[index - 1][property] + secProp;
};

const Path = (props: PathDrawProps) => {
    const { m1, m2, l1, l2 } = props;
    return <path d={`M ${m1} ${m2} L ${l1} ${l2}`} stroke="orangered" fill="none" stroke-width="0.5"/>;
};
