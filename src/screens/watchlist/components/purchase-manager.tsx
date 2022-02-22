import * as React from 'react';
import { useContext } from 'react';
import { Modal } from '../../../shared/components/modal';
import { AuthContext } from '../../../shared/context/auth.context';
import { Form } from '../../../shared/form/form';
import { Repository } from '../../../shared/libs/repository';
import { NewCryptoForm } from '../../newCrypto/components/new-crypto.form';
import { WatchedCrypto } from './watched-crypto';

export const PurchaseManager = (props: any) => {
    const { token } = useContext(AuthContext);
    const request = new Repository();
    request.setAuth(token);

    const deletePurchase = async () => {
        await request.delete(`/crypto/delete_purchase/${props?.data?._id}`, {});

        window.location.reload();
    };

    const content = <div>
        <NewCryptoForm {...props} update={true}/>
        <Form
            onSubmit={deletePurchase}
            form={null}
            submitButton={{ className: 'mt-20 col-100 col-22', title: 'delete', type: 'submit', buttonStyle: 'delete' }}
            className={'row w-100 position-center'}
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
