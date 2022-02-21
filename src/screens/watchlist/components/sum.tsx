import React from 'react';
import { priceFormat } from '../../../shared/libs/helpers';

export const Sum = (props: any) => {
    const containerClasses = 'col-33 py-5 sum-values display-flex flex-column align-items-center background--light';
    let priceBoughtFor = 0;
    let currentPrice = 0;
    let potentialProfit = 0;
    for (const item of props.data) {
        priceBoughtFor += item?.priceBoughtFor;
        currentPrice += item?.currentPrice;
        potentialProfit += item?.potentialProfit;
    }

    return <div className={'row p-20 justify-content-center'}>
        <div className={containerClasses}>
            <p className={'fs-19 fw--700 pb-5'}>Invested</p>
            <p className={'fs-19'}>{priceFormat(priceBoughtFor)}</p>
        </div>
        <div className={containerClasses}>
            <p className={'fs-19 fw--700 pb-5'}>Current value</p>
            <p className={'fs-19'}>{priceFormat(currentPrice)}</p>
        </div>
        <div className={containerClasses}>
            <p className={'fs-19 fw--700 pb-5'}>{potentialProfit < 0 ? 'Accumulated Loss' : 'Accumulated Profit'}</p>
            <p className={'fs-19'}>{priceFormat(potentialProfit)}</p>
        </div>
    </div>;
};
