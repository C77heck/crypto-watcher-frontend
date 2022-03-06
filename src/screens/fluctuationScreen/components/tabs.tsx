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
                return <Graph data={getGraphData(props?.data?.analysis)}/>;
            case graph:
                return <Graph data={getGraphData(props?.data?.analysis)}/>;
            case calculator:
                return <Graph data={getGraphData(props?.data?.analysis)}/>;
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

const getGraphData = (analysis: any): number[] => {
    return [
        Math.abs(analysis.price),
        Math.abs(analysis.priceChangeLast60Days),
        Math.abs(analysis.priceChangeLast90Days),
        Math.abs(analysis.priceChangeLastDay),
        Math.abs(analysis.priceChangeLastHour),
        Math.abs(analysis.priceChangeLastMonth),
        Math.abs(analysis.priceChangeLastWeek),
    ];
};
