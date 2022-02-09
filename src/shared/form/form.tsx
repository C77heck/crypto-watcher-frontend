import { useEffect, useState } from 'react';
import { Button, ButtonProps } from '../components/button';
import { objectToArray } from '../libs/helpers';
import { Input } from './input';

interface FormProps {
    onSubmit: (form: any) => void;
    form: any;
    submitButton?: ButtonProps;
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

    useEffect(() => {
        // TODO -> Our disabling logic is not working.
        console.log(isFormValid, form, getIsFormValid(form));
        setIsFormValid(getIsFormValid(form));
    }, [getIsFormValid, form]);

    const getData = (data: any, isValid: boolean) => {
        setForm({ ...form, [data?.name]: { value: data?.value, isValid: isValid } });
    };
    const submit = (e: any) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(form);
    };

    const inputFields = objectToArray(props.form.fields);

    return <form onSubmit={(e) => submit(e)}>
        {inputFields.map((field, index) => {
            return <Input
                {...field}
                key={index}
                getData={getData}
            />;
        })}

        {props.submitButton && <Button
            disabled={!isFormValid}
            {...props.submitButton}
        />}
    </form>;
};
