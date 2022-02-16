import * as React from 'react';
import { useEffect, useState } from 'react';
import { Modal } from '../components/modal';
import { Button } from './button';

interface SuccessModalProps {
    show: boolean;
    successMessage?: string;
    onClick: (show: boolean) => void;
}

export const SuccessModal = (props: SuccessModalProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const content = <div>
        <h4 className={'fs-24'}>{props.successMessage}</h4>
        <Button title={'Ok'} buttonStyle={'success'} onClick={() => props.onClick(false)}/>
    </div>;

    return <Modal
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 60, lg: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Success</h2>}
        show={show}
    />;
};
