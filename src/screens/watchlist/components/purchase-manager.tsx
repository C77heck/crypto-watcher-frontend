import * as React from 'react';
import { Modal } from '../../../shared/components/modal';
import { NewCryptoForm } from '../../newCrypto/components/new-crypto.form';
import { WatchedCrypto } from './watched-crypto';

export const PurchaseManager = (props: any) => {
    return <Modal
        className={'border-radius-px-5 p-15'}
        content={<NewCryptoForm {...props}/>}
        size={{ sm: 90, md: 60, lg: 40 }}
        header={<h3 className={'fs-24 fw-700 text-align-center'}>Update details</h3>}
        trigger={<WatchedCrypto {...props} />}
    />;
};
