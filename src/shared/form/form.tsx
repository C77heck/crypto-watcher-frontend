import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/button';
import { SuccessModal } from '../components/success.modal';
import { parseError } from '../libs/error-parsers';
import { objectToArray } from '../libs/helpers';
import { ErrorModal } from './error-modal';
import { Input } from './input';

interface FormProps {
    onSubmit: (form: any) => void;
    form: any;
    submitButton?: ButtonProps;
    className?: string;
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
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

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
        try {
            const response = await props.onSubmit(getRestructureForm(form));
            setShowSuccess(true);
        } catch (e: any) {
            const error = parseError(e);
            console.log(error);
            setError(error);
        }
    };

    const inputFields = objectToArray(props.form.fields);

    return <Fragment>
        <form
            onSubmit={(e) => submit(e)}
            className={props.className}
        >
            {inputFields.map((field, index) => {
                return <Input
                    {...field}
                    key={index}
                    getData={getData}
                />;
            })}
            <div className={'row'}>
                {props.submitButton && <Button
                    disabled={!isFormValid}
                    {...props.submitButton}
                />}
            </div>
        </form>
        <ErrorModal
            show={!!error}
            errorMessage={'Fuck Success'}
            onClick={(show) => setError('')}
        />
        <SuccessModal
            show={showSuccess}
            successMessage={'Error'}
            onClick={(show) => setShowSuccess(show)}
        />
    </Fragment>;
};
