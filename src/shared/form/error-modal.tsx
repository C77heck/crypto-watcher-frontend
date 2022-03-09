import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';

interface ErrorModalProps {
    show: boolean;
    errorMessage?: string;
    onClick: (show: string) => void;
}

export const ErrorModal = (props: ErrorModalProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    });

    const content = <div className={'position-center flex-column'}>
        <h4 className={'fs-17 mb-30 text-color--lighter'}>{props.errorMessage}</h4>
        <Button
            title={'Ok'}
            buttonStyle={'error'}
            onClick={() => props.onClick('')}
        />
    </div>;

    return <Modal
        zIndex={'z-157'}
        portal={'status-modal'}
        level={1}
        overlayClick={(show) => props.onClick('')}
        className={'border-radius-px-5 p-15 z-100 box-shadow'}
        content={content}
        size={{ sm: 80, md: 60, lg: 40, xl: 30 }}
        header={<h2 className={'header--3 text-color--error-2 text-align-center'}>Error</h2>}
        show={show}
    />;
};
