import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';

interface SuccessModalProps {
    show: boolean;
    successMessage?: string;
    onClick: (show: string) => void;
}

export const SuccessModal = (props: SuccessModalProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    });

    const content = <div className={'position-center flex-column'}>
        <h4 className={'fs-17 mb-30 text-color--lighter'}>{props.successMessage}</h4>
        <Button
            title={'Ok'}
            buttonStyle={'success'}
            onClick={() => props.onClick('')}
        />
    </div>;

    return <Modal
        zIndex={'z-157'}
        portal={'status-modal'}
        level={1}
        overlayClick={(show) => props.onClick('')}
        className={'border-radius-px-5 p-15 z-100'}
        content={content}
        size={{ sm: 90, md: 72, lg: 60, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Success</h2>}
        show={show}
    />;
};
