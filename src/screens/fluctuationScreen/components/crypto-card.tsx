import { useCallback } from 'react';
import { getClasses, priceFormat } from '../../../shared/libs/helpers';

interface WatchedCryptoProps {
    data: WatchedCryptoProps;
}

export const CryptoCard = (props: any) => {
    const {
        date, name, price, symbol,
        percentChangeLastHour,
        percentChangeLastDay,
        percentChangeLastWeek,
        percentChangeLastMonth,
        percentChangeLast60Days,
        percentChangeLast90Days,
    } = props.data;

    const manageFontSizeByCryptoName = useCallback((name, symbol) => `${name} ${symbol}`.length > 28 ? 'fs-19' : 'fs-24', [name, symbol]);

    const class1 = getClasses(percentChangeLastHour > 0, 'color-green--light', 'color-red--light');
    const class2 = getClasses(percentChangeLastDay > 0, 'color-green--light', 'color-red--light');
    const class3 = getClasses(percentChangeLastWeek > 0, 'color-green--light', 'color-red--light');
    const class4 = getClasses(percentChangeLastMonth > 0, 'color-green--light', 'color-red--light');
    const class5 = getClasses(percentChangeLast60Days > 0, 'color-green--light', 'color-red--light');
    const class6 = getClasses(percentChangeLast90Days > 0, 'color-green--light', 'color-red--light');

    return <div className={'row w-100 crypto-box mx-20 hover-scale box-shadow background--light'}>
        <div className={'col-100 white-space-nowrap data-separator px-10 py-6 position-center'}>
            <p className={`${manageFontSizeByCryptoName(name, symbol)} fw--900`}>{name} </p>
            <p className={'fs-17 fw--700'}>&nbsp;({symbol})</p>

        </div>
        <div className={'col-100 data-separator px-10 py-6 position-center'}>
            <p className={'fs-17 fw--700'}>{priceFormat(price, 1000)}</p>
        </div>
        <div className={'col-100 data-separator px-10 py-6 position-center'}>
            <p className={'fs-17 fw--700'}>Fluctuations</p>
        </div>
        <div className={`${class1} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last hour:</p>
            <p className={'fs-19'}>{percentChangeLastHour} %</p>
        </div>
        <div className={`${class2} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last day:</p>
            <p className={'fs-19'}>{percentChangeLastDay} %</p>
        </div>
        <div className={`${class3} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last week:</p>
            <p className={'fs-19'}>{percentChangeLastWeek} %</p>
        </div>
        <div className={`${class4} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last month:</p>
            <p className={'fs-19'}>{percentChangeLastMonth} %</p>
        </div>
        <div className={`${class5} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last two months:</p>
            <p className={'fs-19'}>{percentChangeLast60Days} %</p>
        </div>
        <div className={`${class6} col-100 data-separator px-10 py-8 display-flex justify-content-space-between`}>
            <p className={'fs-16'}>Last three months:</p>
            <p className={'fs-19'}>{percentChangeLast90Days} %</p>
        </div>
    </div>;
};

