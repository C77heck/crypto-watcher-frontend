import { Fragment, useContext } from 'react';
import { CONSTANTS } from '../../../shared/constants';
import { AuthContext } from '../../../shared/context/auth.context';
import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { OptionProps } from '../../../shared/form/searchable-dropdown';
import { requiredValidator } from '../../../shared/form/validators/required-validator';
import { Repository } from '../../../shared/libs/repository';

const getFormData = (data1: any, data2: any, options: any[]) => {
    const name = data1?.name || data2?.name || '';
    const option = options.filter((op: OptionProps) => op.name === name)?.[0] || {};

    return {
        name,
        price: data1?.price || data2?.price || '',
        amount: data1?.amount || data2?.amount || '',
        identifier: data1?.identifier || data2?.identifier || option?.id || '',
        symbol: data1?.symbol || data2?.symbol || option?.symbol || '',
        thresholds: {
            first: data1?.first || data2?.first || 0,
            second: data1?.second || data2?.second || 0,
            third: data1?.third || data2?.third || 0,
        }
    };
};

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
            name: 'threshold-1',
            label: 'Threshold 1',
            value: props?.data?.thresholds?.first || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'threshold-2',
            label: 'Threshold 2',
            value: props?.data?.thresholds?.second || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
        new Field({
            name: 'threshold-3',
            label: 'Threshold 3',
            value: props?.data?.thresholds?.third || null,
            validators: [requiredValidator],
            className: 'col-100',
            isNumberOnly: true,
        }),
    ]);

    const submit = async (data: any) => {
        if (!isLoggedIn) {
            throw new Error('You need to login first!');
        }
        const { name, price, identifier, amount, symbol, thresholds: { first, second, third } } = getFormData(data, props?.data, (props.options || []));
        const body: any = {
            name, price, identifier, amount, symbol,
            thresholds: {
                first: parseFloat(first || 0) + 100,
                second: parseFloat(second || 0) + 100,
                third: parseFloat(third || 0) + 100,
            }
        };

        return props.update
            ? await request.patch('/crypto/update_purchase', { body })
            : await request.post('/crypto/add_new_purchase', { body });
    };

    return <Fragment>
        <Form
            onSubmit={(data: any) => submit(data)}
            form={formData}
            submitButton={{ className: 'mt-20 col-100', title: 'Go', type: 'submit' }}
            className={'row w-100 position-center'}
        />
    </Fragment>;
};
