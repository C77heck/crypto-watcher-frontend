import { Fragment, useContext } from 'react';
import { CONSTANTS } from '../../../shared/constants';
import { AuthContext } from '../../../shared/context/auth.context';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { Repository } from '../../../shared/libs/repository';
import { Purchase } from '../helpers/helpers';

export const NewCryptoForm = (props: any) => {
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository(token);

    const { INPUTS: { SEARCHABLE_DROPDOWN } } = CONSTANTS;
    const formData = new FormStructure([
        new Field({
            name: 'name',
            label: 'Crypto name',
            value: props?.data?.name || null,
            validators: [requiredValidator],
            element: SEARCHABLE_DROPDOWN,
            options: props?.options || [],
            className: 'col-100'
        }),
        new Field({
            name: 'price',
            label: 'Price (money spent)',
            value: props?.data?.price || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'amount',
            label: 'Purchased Amount',
            value: props?.data?.amount || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'first',
            label: 'Threshold 1',
            value: props?.data?.thresholds?.first - 100 || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'second',
            label: 'Threshold 2',
            value: props?.data?.thresholds?.second - 100 || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'third',
            label: 'Threshold 3',
            value: props?.data?.thresholds?.third - 100 || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
    ]);

    const submit = async (data: any) => {
        if (!isLoggedIn) {
            throw new Error('You need to login first!');
        }

        const body: any = new Purchase(data, props?.data, props.options || []);

        props.update
            ? await request.patch(`/crypto/update_purchase/${props?.data?._id}`, { body })
            : await request.post('/crypto/add_new_purchase', { body });
    };

    return <Fragment>
        <Form
            onSuccess={props.onSuccess}
            onSubmit={(data: any) => submit(data)}
            form={formData}
            submitButton={{ className: 'mt-20 col-100', title: 'Go', type: 'submit' }}
            className={'row w-100 position-center'}
        />
    </Fragment>;
};
