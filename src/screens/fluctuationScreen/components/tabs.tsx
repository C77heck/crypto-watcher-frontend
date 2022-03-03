import { useState } from 'react';
import { staticData } from '../../../shared/config/static-data';
import { Content } from './content';
import { Tab } from './tab';

export const Tabs = (props: any) => {
    const { purchaseMeter, graph, calculator } = staticData.tabs;
    const [content, setContent] = useState(purchaseMeter);

    const getClasses = (tab: string) => {
        return tab === content ? 'background-color--error-1' : '';
    };

    const tabManager = () => {
        switch (content) {
            case purchaseMeter:
                return <h3>Purchase meter content</h3>;
            case graph:
                return <h3>Graph content</h3>;
            case calculator:
                return <h3>Calculator content</h3>;
            default:
                return <h3>Something went wrong</h3>;
        }
    };
    
    return <div className={'display-flex row'}>
        <Tab
            onClick={() => setContent(purchaseMeter)}
            className={`col-33 cursor-pointer hover-opacity ${getClasses(purchaseMeter)}`}
            title={'Purchase meter'}
        />
        <Tab
            onClick={() => setContent(graph)}
            className={`col-33 cursor-pointer hover-opacity ${getClasses(graph)}`}
            title={'Graph'}
        />
        <Tab
            onClick={() => setContent(calculator)}
            className={`col-33 cursor-pointer hover-opacity ${getClasses(calculator)}`}
            title={'Calculator'}
        />
        <Content className={'col-99'}>{tabManager()}</Content>
    </div>;
};
