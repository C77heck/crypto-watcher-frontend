import * as React from 'react';
import { useContext, useState } from 'react';
import { Modal } from '../../../shared/components/modal';
import { AuthContext } from '../../../shared/context/auth.context';
import { Form } from '../../../shared/form/form';
import { Repository } from '../../../shared/libs/repository';
import { CryptoCard } from './crypto-card';
import { Favourties } from './favourties';

export const CryptoManager = (props: any) => {
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const request = new Repository(token);
    // add to favourites
    // tab-1: graph
    // tab-2: tags added by algorithm written from the backend.

    const content = <div>
        <Favourties {...props}/>
        <Form
            onSubmit={() => console.log('clicked')}
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
        trigger={<CryptoCard {...props}/>}
    />;
};
