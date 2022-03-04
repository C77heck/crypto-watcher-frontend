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
    console.log(paths, calculatePath(priceArr));
    return <svg viewBox="0 0 100 50">
        {paths.slice(0, 4).map(path => <Path key={path.id} {...path}/>)}
    </svg>;
};

const formatPathDraw = (itemsToFormat: PathProps[]): PathDrawProps[] => {
    return itemsToFormat.map((item, index) => {
        return {
            ...item,
            id: item.id,
            l1: !!index ? (index === 3 ? item.prevL1 + item.l1 : item.prevL1) : item.l1,
            l2: item.l2,
            m2: !!index ? item.prevM2 : 0,
        };
    }).map((item, index) => {
        console.log({ index, prevM1: item.prevM1, prevL1: item.prevL1 });

        return {
            ...item,
            m1: index > 0 ? (index === 1 ? item.prevM1 : (index === 2 ? item.prevM1 : item.prevM1 + item.prevL1)) : 0,
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
        m1Val = getPrevValues(firstRound, index, 'l1', m1Val);
        m2Val = getPrevValues(firstRound, index, 'l2', m2Val);

        return {
            l1, l2, id,
            prevM1: m1Val,
            prevM2: m2Val,
            prevL1: l1 + l1,
            prevL2: !!index ? getPrevValues(firstRound, index, 'l2') : l2,
        };
    });
};

const getPrevValues = (array: any[], index: number, property: string, addVal = 0): number => {
    return (array?.[index - 1]?.[property] || 0) + addVal;
};

const Path = (props: PathDrawProps) => {
    const { m1, m2, l1, l2 } = props;
    return <path d={`M ${m1} ${m2} L ${l1} ${l2}`} stroke="orangered" fill="none" stroke-width="0.5"/>;
};
