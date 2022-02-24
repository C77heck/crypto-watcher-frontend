import moment from 'moment';
import { getClasses, priceFormat, round } from '../../../shared/libs/helpers';

interface WatchedCryptoProps {
    data: WatchedCryptoProps;
}

export const WatchedCrypto = (props: any) => {
    const { date, first, second, amount, third, name, priceBoughtFor, currentPrice, percentageDiff, potentialProfit } = props.data;
    const percentageClasses = getClasses(100 > percentageDiff, 'color-red', 'color-green--light');
    const threshold1Classes = getClasses(first < percentageDiff, 'color-green--light');
    const threshold2Classes = getClasses(second < percentageDiff, 'color-green--normal');
    const threshold3Classes = getClasses(third < percentageDiff, 'color-green--dark');

    return <div className={'row w-100 crypto-box mx-20 hover-scale box-shadow background--light'}>
        <div className={'col-100 data-separator px-10 py-6 position-center'}>
            <p className={'fs-24 fw--900'}>{name}</p>
        </div>
        <div className={'col-100 data-separator px-10 py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Purchase date:</p>
            <p className={'fs-19'}>{moment(date).format('YYYY.MM.DD')}</p>
        </div>
        <div className={'col-100 data-separator px-10 py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Amount:</p>
            <p className={'fs-19'}>{amount}</p>
        </div>
        <div className={'col-100 data-separator px-10 py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Price when bought:</p>
            <p className={'fs-19'}>{priceFormat(priceBoughtFor)}</p>
        </div>
        <div className={'col-100 data-separator px-10 py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Current price:</p>
            <p className={'fs-19'}>{priceFormat(currentPrice)}</p>
        </div>
        <div className={`${percentageClasses} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Difference:</p>
            <p className={'fs-19'}>{round(percentageDiff)} %</p>
        </div>
        <div className={'col-100 data-separator px-10 py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>{potentialProfit < 0 ? 'Loss' : 'Profit'}:</p>
            <p className={'fs-19'}>{priceFormat(potentialProfit)}</p>
        </div>
        <div
            className={`${threshold1Classes} col-100 data-separator px-10`}
        >
            <p className={'fs-16'}>first threshold:</p>
            <p className={'fs-19'}>{first} %</p>

        </div>
        <div
            className={`${threshold2Classes} col-100 data-separator px-10`}
        >
            <p className={'fs-16'}>second threshold:</p>
            <p className={'fs-19'}>{second} %</p>
        </div>
        <div
            className={`${threshold3Classes} col-100 data-separator px-10`}
        >
            <p className={'fs-16'}>third threshold:</p>
            <p className={'fs-19'}>{third} %</p>
        </div>
    </div>;
};

