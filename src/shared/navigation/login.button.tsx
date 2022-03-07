import moment from 'moment';
import * as React from 'react';
import { useContext } from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';
import { AuthContext } from '../context/auth.context';
import { Field } from '../form/field';
import { Form } from '../form/form';
import { FormStructure } from '../form/form.structure';
import { emailValidator } from '../form/validators/email-validator';
import { requiredValidator } from '../form/validators/required-validator';
import { useClient } from '../hooks/client';

export const LoginButton = (props: any) => {
    const { signout, signin, isLoggedIn } = useContext(AuthContext);
    const client = useClient();
    const formData = new FormStructure([
        new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [emailValidator],
            options: props.options || [],
            className: 'col-100'
        }),
        new Field({
            name: 'password',
            label: 'Password',
            value: null,
            validators: [requiredValidator],
            className: 'col-100',
            type: 'password',
        }),
    ]);

    const submit = async (data: any) => {
        const body: any = {
            email: "zcsilleri@gmail.com" || data?.email || '',
            password: "Sug@bodyDicHtml32" || data?.password || '',
        };
        const response: any = await client.client('/users/login', 'post', { body });

        signin({ ...(response?.userData || {}), expiry: moment() });
    };

    if (isLoggedIn) {
        return <Button
            textColor={'text-color--light-1'}
            buttonStyle={'logout'}
            title={'Logout'}
            onClick={() => signout()}
        />;
    }

    const content = <Form
        {...client}
        onSubmit={(data: any) => submit(data)}
        form={formData}
        submitButton={{ className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Login', type: 'submit' }}
        className={'row margin-auto w-60'}
    />;

    return <Modal
        level={2}
        className={'border-radius-px-5 p-15'}
        content={content}
        size={{ sm: 90, md: 72, lg: 60, xl: 40 }}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        trigger={<Button textColor={'text-color--light-1'} buttonStyle={'login'} title={'Login'}/>}
    />;
};
