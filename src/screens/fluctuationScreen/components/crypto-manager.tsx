import * as React from 'react';
import { Modal } from '../../../shared/components/modal';
import { CryptoCard } from './crypto-card';
import { Favourties } from './favourties';
import { Tabs } from './tabs';

export const CryptoManager = (props: any) => {
    // add to favourites
    // tab-1: graph
    // tab-2: tags added by algorithm written from the backend.

    const header = <h3 className={'fs-24 fw-700 text-align-center position-center'}>
        <Favourties {...props}/>
        <span>{props?.data?.name}</span>
    </h3>;
    const content = <div>
        <Tabs {...props} />
    </div>;

    return <Modal
        level={3}
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 95, md: 70, lg: 65, xl: 50 }}
        header={header}
        trigger={<CryptoCard {...props}/>}
    />;
};
