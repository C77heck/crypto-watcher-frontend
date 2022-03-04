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
    const priceArr = [{ from: 13, to: 22, l1: 17 }, { from: 22, to: 32, l1: 17 }, { from: 32, to: 16, l1: 17 }, { from: 16, to: 20, l1: 17 }, { from: 20, to: 36, l1: 17 }, { from: 20, to: 36, l1: 17 }];

    const paths: PathDrawnProps[] = calculatePath(priceArr, 0, 0);
    console.log(paths);
    return <svg viewBox="0 0 100 50">
        {paths.map(path => <Path {...path}/>)}
        {/*<path d="M 0 0 l 24 10" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 24 10 l 24 20" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 48 20 l 24 30" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 70 30 l 22 40" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 85 40 l 15 50" stroke="orangered" fill="none" stroke-width="1"/>*/}
        {/*<path d="m 93 50 l 8 60" stroke="orangered" fill="none" stroke-width="1"/>*/}
    </svg>;
};

// we need the price from and price to in arrays
interface PriceProps {
    from: number;
    to: number;
    l1: number;
}

interface PathDrawnProps {
    prevM1: number;
    prevM2: number;
    prevL1: number;
    prevL2: number;
    l1: number;
    l2: number;
}

// M1 = prevM1 prevL1
// M2 = prevM2 prevL2
const calculatePath = (priceArr: PriceProps[], startM1: number, startM2: number): PathDrawnProps[] => {
    let m1Val = startM1;
    let m2Val = startM2;
    priceArr.map((i, index) => {
        console.log(!!index);
        return i;
    });
    const calcValues = priceArr.map(({ from, to, l1 }, index) => ({
        l1,
        m1: !!index ? m1Val += l1 : m1Val,
        m2: !!index ? m2Val + (from - to) * -1 : m2Val,
        l2: (from - to) * -1
    }));

    return calcValues.map(({ l1, l2 }, index) => {

        return {
            l1, l2,
            prevM1: !!index ? getPrevValues(calcValues, index, 'm1', 'l1') : 0,
            prevM2: !!index ? getPrevValues(calcValues, index, 'm2', 'l2') : 0,
            prevL1: !!index ? getPrevValues(calcValues, index, 'l1') : l1,
            prevL2: !!index ? getPrevValues(calcValues, index, 'l2') : l2,
        };
    });
};

const getPrevValues = (array: any[], index: number, property: string, secProp = ''): number => {
    return !secProp ? array[index - 1][property] : array[index - 1][property] + array[index - 1][secProp];
};

interface PathProps {
    prevM1: number;
    prevM2: number;
    prevL1: number;
    prevL2: number;
    l1: number;
    l2: number;
}

const Path = (props: PathProps) => {
    const { prevM1, prevM2, prevL1, prevL2, l1, l2 } = props;
    const m1 = prevM1 + prevL1;
    const m2 = prevM2 + prevL2;

    return <path d={`M ${m1} ${m2} L ${l1} ${l2}`} stroke="orangered" fill="none" stroke-width="0.5"/>;
};

// 90
// 60
// 30
// 7
// 1
// 0.04
