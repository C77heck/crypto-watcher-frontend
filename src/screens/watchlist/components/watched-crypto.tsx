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
    return <div className={'row w-px-300 crypto-box mx-20'}>
        <div className={'col-100 data-separator py-6 text-align-center'}>
            <p className={'fs-24 fw--900'}>{name}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>Purchase date:</p>
            <p className={'fs-19'}>{moment(date).format('YYYY.MM.DD')}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>Price when bought:</p>
            <p className={'fs-19'}>{priceFormat(priceBoughtFor)}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>Current price:</p>
            <p className={'fs-19'}>{priceFormat(currentPrice)}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>Difference:</p>
            <p className={'fs-19'}>{percentageDiff}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>Profit:</p>
            <p className={'fs-19'}>{priceFormat(potentialProfit)}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>threshold first:</p>
            <p className={'fs-19'}>{first}</p>

        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>threshold second:</p>
            <p className={'fs-19'}>{second}</p>
        </div>
        <div className={'col-100 data-separator py-6 display-flex justify-content-space-between'}>
            <p className={'fs-19'}>threshold third:</p>
            <p className={'fs-19'}>{third}</p>
        </div>
    </div>;
};
