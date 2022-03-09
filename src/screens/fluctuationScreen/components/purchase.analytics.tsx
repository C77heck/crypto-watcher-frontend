import {useCallback} from "react";
import {priceFormat} from "../../../shared/libs/helpers";

interface AnalyticsProps {
    identifier: number;
    isDecline: true
    isGoodBuy: true
    median: number;
    name: string;
    price: number;
    priceChangeLast60Days: number;
    priceChangeLast90Days: number;
    priceChangeLastDay: number;
    priceChangeLastHour: number;
    priceChangeLastMonth: number;
    priceChangeLastWeek: number;
    stabilityRating: string;
    symbol: string;
}

interface PurchaseAnalyticsProps {
    analyticsData: AnalyticsProps;
}

export const PurchaseAnalytics = ({analyticsData}: PurchaseAnalyticsProps) => {
    console.log(analyticsData);
    const getColor = useCallback((condition: boolean) => {
        const genericClasses = '';
        return condition ? `${genericClasses} text-color--active` : `${genericClasses}`;
    }, []);

    return <div>
        <div className={'row pb-10'}>
            <p className={'col-50 fs-14 fw--600'}>Current price</p>
            <p className={'col-50 fs-14 fw--600'}>{priceFormat(analyticsData.price)}</p>
        </div>
        <div className={'row pb-10'}>
            <p className={'col-50 fs-14 fw--600'}>Median (past three months)</p>
            <p className={'col-50 fs-14 fw--600'}>{priceFormat(analyticsData.median)}</p>
        </div>
        <div className={'pb-10'}>
            <Tag
                className={`mb-10 ${getColor(!!analyticsData.stabilityRating)}`}
                value={analyticsData.stabilityRating}
            />
            <Tag
                className={`mb-10 ${getColor(analyticsData.isGoodBuy)}`}
                value={analyticsData.isGoodBuy ? 'Good buy' : 'Not a good buy'}
            />
            <Tag
                className={`mb-10 ${getColor(analyticsData.isDecline)}`}
                value={analyticsData.isDecline ? 'Declining state' : 'Inclining state'}
            />
        </div>
    </div>;
}

interface TagsProps {
    value: string
    className?: string;
}

const Tag = ({value, className}: TagsProps) => {

    return <div className={`${className} position-center analytics-tag h-px-18 width-fit-content px-14`}>
        <p className={'fs-14 fw--700'}>{value}</p>
    </div>
}