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
    return <svg viewBox="0 0 100 50">
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={startl1} l2={startl2}/>
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={24} l2={10}/>
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={24} l2={10}/>
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={24} l2={10}/>
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={24} l2={10}/>
        <Path prevM1={0} prevM2={0} prevL1={0} prevL2={0} l1={24} l2={10}/>

        <path d="M 0 0 l 24 10" stroke="orangered" fill="none" stroke-width="1"/>
        <path d="m 24 10 l 24 20" stroke="orangered" fill="none" stroke-width="1"/>
        <path d="m 48 20 l 24 30" stroke="orangered" fill="none" stroke-width="1"/>
        <path d="m 70 30 l 22 40" stroke="orangered" fill="none" stroke-width="1"/>
        <path d="m 85 40 l 15 50" stroke="orangered" fill="none" stroke-width="1"/>
        <path d="m 93 50 l 8 60" stroke="orangered" fill="none" stroke-width="1"/>
    </svg>;
};

// we need the price from and price to in arrays
const priceArr = [{ from: 13, to: 22 }, { from: 22, to: 32 }, { from: 32, to: 16 }, { from: 16, to: 20 }, { from: 20, to: 36 }];
const calculatePath = (): any[] => {
    return priceArr.map(({ from, to }) => {
        const l1 = (to - from) * -1;
        // l2 will be set by us
        return { l1 };
    });
};
// M1 = prev m1 and l1
// M2 = prev m2 and l2
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
//
// M moves relative to the viewbox while lowercase m means relative to the last point drawn
// It seems that it just determines the position inside of the view box we outlined.
//     The first number is on the x-axis the second is on the y-axis.
//
//     L is for actually drawing the line
// The first number is for length the second number is for tilting the line
