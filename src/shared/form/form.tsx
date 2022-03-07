import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/button';
import { SuccessModal } from '../components/success.modal';
import { ClientProps } from '../hooks/client';
import { ErrorModal } from './error-modal';
import Input from './input';

interface FormProps extends ClientProps {
    onSubmit: (form: any) => void;
    form: any;
    submitButton?: ButtonProps;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
}

const getIsFormValid = (form: any) => {
    const isValidArr = [];
    for (const prop in form) {
        if (form.hasOwnProperty(prop)) {
            if (!form[prop]?.isValid) {
                return false;
            }
            isValidArr.push(`${form[prop]?.isValid}`);
        }
    }

    return !isValidArr.includes('false');
};

export const Form = (props: FormProps) => {
    const [form, setForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { isLoading, error, clearError, successMessage, clearMessage } = props;
    useEffect(() => {
        setIsFormValid(getIsFormValid(form));
    }, [getIsFormValid, form]);

    const getData = (data: any, isValid: boolean) => {
        setForm({ ...form, [data?.name]: { value: data?.value, isValid: isValid } });
    };

    const getRestructureForm = (form: any) => {
        const restructuredForm: any = {};
        for (const prop in form) {
            if (form.hasOwnProperty(prop)) {
                restructuredForm[prop] = form[prop]?.value || null;
            }
        }

        return restructuredForm;
    };

    const submit = async (e: any) => {
        e.preventDefault();
        const response: any = await props.onSubmit(getRestructureForm(form));
    };

    const manageSuccessClose = () => {
        if (props.onSuccess) {
            props.onSuccess();
        }

        clearMessage();
    };

    const manageErrorClose = () => {
        if (props.onError) {
            props.onError();
        }

        clearError();
    };

    return <Fragment>
        <form
            onSubmit={(e) => submit(e)}
            className={props.className}
        >
            {props.form?.fields && props.form.fields.map((field: any, index: number) => {
                return <Input
                    {...field}
                    key={field.name}
                    getData={getData}
                />;
            })}
            <div className={'row'}>
                {props.submitButton && <Button
                    isLoading={isLoading}
                    disabled={!isFormValid}
                    {...props.submitButton}
                />}
            </div>
        </form>
        <ErrorModal
            show={!!error}
            errorMessage={error}
            onClick={manageErrorClose}
        />
        <SuccessModal
            show={!!successMessage}
            successMessage={successMessage}
            onClick={manageSuccessClose}
        />
    </Fragment>;
};
