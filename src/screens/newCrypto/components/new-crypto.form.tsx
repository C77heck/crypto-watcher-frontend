import { Fragment } from 'react';
import { CONSTANTS } from '../../../shared/constants';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { OptionProps } from '../../../shared/form/searchable-dropdown';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { Repository } from '../../../shared/libs/repository';

export const NewCryptoForm = (props: any) => {
    const request = new Repository();
    const { INPUTS: { SEARCHABLE_DROPDOWN } } = CONSTANTS;
    const formData = new FormStructure({
        name: new Field({
            name: 'name',
            label: 'Crypto name',
            value: null,
            validators: [requiredValidator],
            element: SEARCHABLE_DROPDOWN,
            options: props.options || [],
            className: 'col-100 col-md-22'
        }),
        amount: new Field({
            name: 'amount',
            label: 'Purchased Amount',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        price: new Field({
            name: 'price',
            label: 'Price (money spent)',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        'threshold-1': new Field({
            name: 'threshold-1',
            label: 'Threshold 1',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        'threshold-2': new Field({
            name: 'threshold-2',
            label: 'Threshold 2',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
        'threshold-3': new Field({
            name: 'threshold-3',
            label: 'Threshold 3',
            value: null,
            validators: [requiredValidator],
            className: 'col-100 col-md-22',
            isNumberOnly: true,
        }),
    });

    const submit = async (data: any) => {
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
