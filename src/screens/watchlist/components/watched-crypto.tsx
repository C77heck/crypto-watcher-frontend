// name
// bought price
// current price
// difference between
// set up thresholds

import moment from 'moment';
import { priceFormat } from '../../../shared/libs/helpers';

interface WatchedCryptoProps {
    data: WatchedCryptoProps;
}

export const WatchedCrypto = (props: any) => {
    const { date, first, second, third, name, priceBoughtFor, currentPrice, percentageDiff, potentialProfit } = props.data;
    console.log(props.data);
    return <div className={'row w-px-300 crypto-box mx-20'}>
        <div className={'col-100 data-separator py-6 text-align-center'}>
            <p className={'fs-24 fw--900'}>{name}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Purchase date:</p>
            <p className={'fs-19'}>{moment(date).format('YYYY.MM.DD')}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Price when bought:</p>
            <p className={'fs-19'}>{priceFormat(priceBoughtFor)}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Current price:</p>
            <p className={'fs-19'}>{priceFormat(currentPrice)}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Difference:</p>
            <p className={'fs-19'}>{percentageDiff}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>Profit:</p>
            <p className={'fs-19'}>{priceFormat(potentialProfit)}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>threshold first:</p>
            <p className={'fs-19'}>{first}</p>

        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>threshold second:</p>
            <p className={'fs-19'}>{second}</p>
        </div>
        <div className={'col-100 data-separator py-8 display-flex justify-content-space-between'}>
            <p className={'fs-16'}>threshold third:</p>
            <p className={'fs-19'}>{third}</p>
        </div>
    </div>;
};
