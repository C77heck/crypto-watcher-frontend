import { useState } from 'react';
import { staticData } from '../../../shared/config/static-data';
import { numArray } from '../../../shared/libs/helpers';
import { Content } from './content';
import { Graph } from './graph';
import { Tab } from './tab';

export const Tabs = (props: any) => {
    const { purchaseMeter, graph, calculator } = staticData.tabs;
    const [content, setContent] = useState(purchaseMeter);
    const getClasses = (tab: string) => {
        return tab === content ? 'background-color--active' : '';
    };

    const tabManager = () => {
        switch (content) {
            case purchaseMeter:
                return <h3>purchaseMeter</h3>;
            case graph:
                const { data, labels } = getGraphData(props?.data?.analysis);
                return <Graph data={data} labels={labels}/>;
            case calculator:
                return <h3>calculator</h3>;
            default:
                return <h3>Something went wrong</h3>;
        }
    };

    return <div className={'display-flex row'}>
        <Tab
            onClick={() => setContent(purchaseMeter)}
            className={`col-33 golden-box--full border-radius--tl cursor-pointer hover-opacity ${getClasses(purchaseMeter)}`}
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
}

const getGraphData = (analysis: any): AnalysisProps => {
    return {
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
        return Math.abs(price > endValue ? price - (item * changeInDay) : price + (item * changeInDay));
    });
};
