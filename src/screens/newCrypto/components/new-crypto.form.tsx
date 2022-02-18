import { Fragment, useContext } from 'react';
import { CONSTANTS } from '../../../shared/constants';
import { AuthContext } from '../../../shared/context/auth.context';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { OptionProps } from '../../../shared/form/searchable-dropdown';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { Repository } from '../../../shared/libs/repository';

export const NewCryptoForm = (props: any) => {
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository();
    request.setAuth(token);

    const { INPUTS: { SEARCHABLE_DROPDOWN } } = CONSTANTS;
    const formData = new FormStructure([
        new Field({
            name: 'name',
            label: 'Crypto name',
            value: props?.data?.name || null,
            validators: [requiredValidator],
            element: SEARCHABLE_DROPDOWN,
            options: props?.options || [],
            className: 'col-100 col-md-22'
        }),
        new Field({
            name: 'amount',
            label: 'Purchased Amount',
            value: props?.data?.amount || null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        new Field({
            name: 'price',
            label: 'Price (money spent)',
            value: props?.data?.price || null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        new Field({
            name: 'threshold-1',
            label: 'Threshold 1',
            value: props?.data?.thresholds?.first || null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        new Field({
            name: 'threshold-2',
            label: 'Threshold 2',
            value: props?.data?.thresholds?.second || null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        new Field({
            name: 'threshold-3',
            label: 'Threshold 3',
            value: props?.data?.thresholds?.third || null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
    ]);

    const submit = async (data: any) => {
        if (!isLoggedIn) {
            throw new Error('You need to login first!');
        }
        const body: any = {
            name: data?.name || '',
            symbol: (props.options || []).filter(({ name, symbol }: OptionProps) => name === data?.name)[0]?.symbol || data?.name,
            price: data?.price || 0,
            amount: data?.amount || 0,
            thresholds: {
                first: parseFloat(data?.['threshold-1'] || 0) + 100,
                second: parseFloat(data?.['threshold-2'] || 0) + 100,
                third: parseFloat(data?.['threshold-3'] || 0) + 100,
            }
        };

        return await request.post('/crypto/add_new_purchase', { body, headers: [] });
    };

    return <Fragment>
        <Form
            onSubmit={(data: any) => submit(data)}
            form={formData}
            submitButton={{ className: 'mt-20 col-100 col-md-22', title: 'Go', type: 'submit' }}
            className={'row w-100 position-center'}
        />
    </Fragment>;
};
