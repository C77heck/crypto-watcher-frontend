import * as React from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';
import { Field } from '../form/field';
import { Form } from '../form/form';
import { FormStructure } from '../form/form.structure';
import { Repository } from '../libs/repository';

export const LoginButton = (props: any) => {
    const request = new Repository();
    const formData = new FormStructure({
        email: new Field({
            name: 'email',
            label: 'Email',
            value: null,
            validators: [],
            options: props.options || [],
            className: 'col-60'
        }),
        password: new Field({
            name: 'password',
            label: 'Password',
            value: null,
            validators: [],
            className: 'col-60',
            type: 'password',
        }),
    });

    const submit = async (data: any) => {
        try {
            console.log({ data });
            const body: any = {
                email: data?.email || '',
                password: data?.password || '',
            };
            const response = await request.post('/login', { body, headers: [] });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    const content = <Form
        onSubmit={(data: any) => submit(data)}
        form={formData}
        submitButton={{ className: 'mt-20 col-22', title: 'Login', type: 'submit' }}
        className={'row flex-column position-center'}
    />;

    return <Modal
        className={'border-radius-px-5 p-15'}
        content={content}
        size={40}
        header={<h2 className={'header--3 text-align-center'}>Sign in</h2>}
        trigger={<Button buttonStyle={'login'} title={'Login'}/>}
    />;
};
