import {useCallback} from "react";
import {priceFormat} from "../../../shared/libs/helpers";


interface PriceStabilityAnalysis {
    label: string;
    grade: number;
}

interface AnalyticsProps {
    identifier: number;
    isDecline: boolean
    median: number;
    name: string;
    price: number;
    priceChangeLast60Days: number;
    priceChangeLast90Days: number;
    priceChangeLastDay: number;
    priceChangeLastHour: number;
    priceChangeLastMonth: number;
    priceChangeLastWeek: number;
    stabilityRating: PriceStabilityAnalysis;
    symbol: string;
}

interface PurchaseAnalyticsProps {
    analyticsData: AnalyticsProps;
}

// delete this down the line...
const checkPriceStability = (price: number, median: number) => {
    const percentageDiff = Math.abs(price / median);
    if (percentageDiff < 1) {
        return percentageDiff + 0.1 > 1
            ? {grade: 1, label: 'weak buy'} : percentageDiff + 0.2 > 1
                ? {grade: 2, label: 'okay buy'} : percentageDiff + 0.3 > 1
                    ? {grade: 3, label: 'fairly good buy'} : percentageDiff + 0.4 > 1
                        ? {grade: 4, label: 'very good buy'} : {grade: 5, label: 'well below its median'};
    } else {
        return percentageDiff - 0.1 > 1
            ? {grade: -1, label: 'steady price'} : percentageDiff - 0.2 > 1
                ? {grade: -2, label: 'okay sale'} : percentageDiff - 0.3 > 1
                    ? {grade: -3, label: 'good sale'} : percentageDiff - 0.4 > 1
                        ? {grade: -4, label: 'very good sale'} : {grade: -5, label: 'excellent sale'};
    }
}

export const PurchaseAnalytics = ({analyticsData}: PurchaseAnalyticsProps) => {
    console.log(checkPriceStability(analyticsData.price, analyticsData.median));
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
                className={`mb-10 ${getPriceAnalysisClasses(analyticsData.stabilityRating.grade)}`}
                value={analyticsData.stabilityRating.label}
            />
            <Tag
                className={`mb-10 ${getPriceAnalysisClasses(analyticsData.isDecline)}`}
                value={analyticsData.isDecline ? 'Declining state' : 'Inclining state'}
            />
        </div>
    </div>;
}


const getPriceAnalysisClasses = (grade: number | boolean) => {
    const genericClasses = '';
    switch (grade) {
        case true:
            return `${genericClasses} tag-color--1`;
        case false:
            return `${genericClasses} tag-color--5`;
        case 1:
            return `${genericClasses} tag-color--1`;
        case 2:
            return `${genericClasses} tag-color--2`;
        case 3:
            return `${genericClasses} tag-color--3`;
        case 4:
            return `${genericClasses} tag-color--4`;
        case 5:
            return `${genericClasses} tag-color--5`;
        case -1:
            return `${genericClasses} tag-color--1`;
        case -2:
            return `${genericClasses} tag-color--2`;
        case -3:
            return `${genericClasses} tag-color--3`;
        case -4:
            return `${genericClasses} tag-color--4`;
        case -5:
            return `${genericClasses} tag-color--5 `;
        default:
            return genericClasses;
    }
}

interface TagsProps {
    value: string
    className?: string;
}

const Tag = ({value, className}: TagsProps) => {

    return <div className={`${className} position-center analytics-tag h-px-18 width-fit-content px-14`}>
        <p className={'fs-14 fw--700 color-inherit'}>{value}</p>
    </div>
}