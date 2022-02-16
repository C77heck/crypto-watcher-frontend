import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';

interface ErrorModalProps {
    show: boolean;
    errorMessage?: string;
    onClick: (show: boolean) => void;
}

export const ErrorModal = (props: ErrorModalProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const content = <div>
        <h4 className={'fs-17'}>{props.errorMessage}</h4>
        <Button title={'Ok'} buttonStyle={'error'} onClick={() => props.onClick(false)}/>
    </div>;

    return <Modal
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 60, lg: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Error</h2>}
        show={show}
    />;
};
