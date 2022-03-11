import moment from 'moment';
import * as React from "react";
import {useContext} from "react";
import {Button} from "../components/button";
import {AuthContext} from "../context/auth.context";
import {Field} from "../form/field";
import {Form} from "../form/form";
import {FormStructure} from "../form/form.structure";
import {emailValidator} from "../form/validators/email-validator";
import {requiredValidator} from "../form/validators/required-validator";
import {useClient} from "../hooks/client";

export const LoginForm = (props: any) => {
    const client = useClient();
    const {signin} = useContext(AuthContext);

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
            email: "something@gmail.com" || data?.email || '',
            password: "something@gmail.com s" || data?.password || '',
        };
        const response: any = await client.client('/users/login', 'post', {body});

        if (!client.error && !!response) {
            signin({...(response?.userData || {}), expiry: moment()});
        }
    };

    return <div>
        <Form
            {...client}
            onSubmit={(data: any) => submit(data)}
            form={formData}
            submitButton={{className: 'mt-20 col-100 col-md-40 col-lg-22 margin-auto', title: 'Login', type: 'submit'}}
            className={'row margin-auto w-60'}
        />
        <div className={'position-center py-15'}>
            <Button title={'Register'} buttonStyle={'link'} onClick={props.onClick}/>
        </div>
    </div>;
};
