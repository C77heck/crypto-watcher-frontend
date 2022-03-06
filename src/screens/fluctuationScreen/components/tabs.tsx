import { useState } from 'react';
import { staticData } from '../../../shared/config/static-data';
import { Content } from './content';
import { Graph } from './graph';
import { Tab } from './tab';

export const Tabs = (props: any) => {
    const { purchaseMeter, graph, calculator } = staticData.tabs;
    const [content, setContent] = useState(purchaseMeter);
    console.log(props);
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
    console.log({
        price: analysis.price,
        priceChangeLast60Days: analysis.priceChangeLast60Days,
        priceChangeLast90Days: analysis.priceChangeLast90Days,
        priceChangeLastDay: analysis.priceChangeLastDay,
        priceChangeLastHour: analysis.priceChangeLastHour,
        priceChangeLastMonth: analysis.priceChangeLastMonth,
        priceChangeLastWeek: analysis.priceChangeLastWeek,
    });
    return {
        labels: [],
        data: [
            analysis.price,
            analysis.priceChangeLast60Days,
            analysis.priceChangeLast90Days,
            analysis.priceChangeLastDay,
            analysis.priceChangeLastHour,
            analysis.priceChangeLastMonth,
            analysis.priceChangeLastWeek,
        ]
    };
};
