import * as React from 'react';
import { useContext, useState } from 'react';
import { Modal } from '../../../shared/components/modal';
import { AuthContext } from '../../../shared/context/auth.context';
import { Repository } from '../../../shared/libs/repository';
import { CryptoCard } from './crypto-card';
import { Favourties } from './favourties';
import { Tabs } from './tabs';

export const CryptoManager = (props: any) => {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const request = new Repository(token);
    // add to favourites
    // tab-1: graph
    // tab-2: tags added by algorithm written from the backend.

    const header = <h3 className={'fs-24 fw-700 text-align-center position-center'}>
        <span>{props?.data?.name}</span>
        <Favourties {...props}/>
    </h3>;
    const content = <div>
        <Tabs {...props} />
    </div>;

    return <Modal
        level={3}
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 60, lg: 50, xl: 40 }}
        header={header}
        trigger={<CryptoCard {...props}/>}
    />;
};
