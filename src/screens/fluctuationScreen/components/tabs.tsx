import {useState} from 'react';
import {staticData} from '../../../shared/config/static-data';
import {numArray} from '../../../shared/libs/helpers';
import {Calculator} from './calculator';
import {Content} from './content';
import {Graph} from './graph';
import {Tab} from './tab';
import {PurchaseAnalytics} from "./purchase.analytics";

export const Tabs = (props: any) => {
    const {purchaseAnalytics, graph, calculator} = staticData.tabs;
    const [content, setContent] = useState(purchaseAnalytics);
    const getClasses = (tab: string) => {
        return tab === content ? 'background-color--active' : '';
    };

    const tabManager = () => {
        switch (content) {
            case purchaseAnalytics:
                return <PurchaseAnalytics analyticsData={props?.data?.analysis || {}}/>;
            case graph:
                const {data, labels, cryptoName} = getGraphData(props?.data?.analysis);
                return <Graph data={data} labels={labels} cryptoName={cryptoName}/>;
            case calculator:
                return <Calculator data={props?.data?.analysis || {}}/>;
            default:
                return <h3>Something went wrong</h3>;
        }
    };

    return <div className={'display-flex row'}>
        <Tab
            onClick={() => setContent(purchaseAnalytics)}
            className={`col-33 golden-box--full border-radius--tl cursor-pointer hover-opacity ${getClasses(purchaseAnalytics)}`}
            title={'Purchase meter'}
        />
        <Tab
            onClick={() => setContent(graph)}
            className={`col-33 golden-box--no-sides cursor-pointer hover-opacity ${getClasses(graph)}`}
            title={'Graph'}
        />
        <Tab
            onClick={() => setContent(calculator)}
            className={`col-33 golden-box--full border-radius--tr cursor-pointer hover-opacity ${getClasses(calculator)}`}
            title={'Calculator'}
        />
        <Content className={'col-99 golden-box--no-top border-radius--b'}>{tabManager()}</Content>
    </div>;
};

interface AnalysisProps {
    data: number[];
    labels: string[];
    cryptoName: string;
}

const getGraphData = (analysis: any): AnalysisProps => {
    console.log(analysis);
    return {
        cryptoName: analysis?.name,
        labels: numArray(90).map(num => (`${num} day`)).reverse(),
        data: [
            ...stepDown(analysis.priceChangeLast90Days, analysis.priceChangeLast60Days),
            ...stepDown(analysis.priceChangeLast60Days, analysis.priceChangeLastMonth),
            ...stepDown(analysis.priceChangeLastMonth, analysis.priceChangeLastWeek),
            ...stepDown(analysis.priceChangeLastWeek, analysis.priceChangeLastDay, 7),
            analysis.priceChangeLastDay,
            analysis.priceChangeLastHour,
            analysis.price,
        ]
    };
};

const stepDown = (price: number, endValue: number, rounds = 30): number[] => {
    const changeInDay = (price - endValue) / rounds;

    return numArray(rounds).map(item => {
        // console.log({price, changeInDay, item, endValue, rounds});
        return Math.abs(price > endValue ? price - (item * changeInDay) : price + (item * changeInDay));
    });
};
