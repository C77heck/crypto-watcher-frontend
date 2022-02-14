import * as React from 'react';
import { Modal } from '../components/modal';

export const ErrorModal = (props: any) => {
    const content = <h3>{props.error}</h3>;

    return <Modal
        show={!!props.error}
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 60, lg: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Error</h2>}
        // footer={<Button buttonStyle={'error'} title={'Ok'}/>}
    />;
};
