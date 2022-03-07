import * as React from 'react';
import { Modal } from '../../../shared/components/modal';
import { Form } from '../../../shared/form/form';
import { useClient } from '../../../shared/hooks/client';
import { NewCryptoForm } from '../../newCrypto/components/new-crypto.form';
import { WatchedCrypto } from './watched-crypto';

export const PurchaseManager = (props: any) => {
    const client = useClient();

    const deletePurchase = async () => {
        await client.client(`/crypto/delete_purchase/${props?.data?._id}`, 'delete', {});
    };

    const content = <div>
        <NewCryptoForm {...props} update={true} onSuccess={() => window.location.reload()}/>
        <Form
            {...client}
            onSubmit={deletePurchase}
            form={null}
            submitButton={{ className: 'mt-20 col-100 col-22', title: 'delete', type: 'submit', buttonStyle: 'delete' }}
            className={'row w-100 position-center'}
            onSuccess={() => window.location.reload()}
        />
    </div>;

    return <Modal
        level={3}
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 60, lg: 50, xl: 40 }}
        header={<h3 className={'fs-24 fw-700 text-align-center'}>Update details</h3>}
        trigger={<WatchedCrypto {...props} />}
    />;
};
