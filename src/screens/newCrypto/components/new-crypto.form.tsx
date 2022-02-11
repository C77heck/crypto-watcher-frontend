import { Field } from '../../../shared/form/field';
import { Form } from '../../../shared/form/form';
import { FormStructure } from '../../../shared/form/form.structure';
import { onlyStringsValidator } from '../../../shared/form/validators/only-strings-validator';
import { Repository } from '../../../shared/libs/repository';

export const NewCryptoForm = (props: any) => {
    const request = new Repository();
    const formData = new FormStructure({
        'crypto-name': new Field({
            name: 'crypto-name',
            label: 'Crypto name',
            value: null,
            validators: [onlyStringsValidator],
            options: props.options || [],
            className: 'col-100 col-md-22'
        }),
        'purchased-amount': new Field({
            name: 'purchased-amount',
            label: 'Purchased Amount',
            value: null,
            validators: [],
            className: 'col-100 col-md-22'
        }),
        'threshold-1': new Field({
            name: 'threshold-1',
            label: 'Threshold 1',
            value: null,
            validators: [],
            className: 'col-100 col-md-22'
        }),
        'threshold-2': new Field({
            name: 'threshold-2',
            label: 'Threshold 2',
            value: null,
            validators: [],
            className: 'col-100 col-md-22'
        }),
        'threshold-3': new Field({
            name: 'threshold-3',
            label: 'Threshold 3',
            value: null,
            validators: [],
            className: 'col-100 col-md-22'
        }),
    });

    const submit = async (data: any) => {
        try {
            const response = await request.post('/add_new_purchase', { body: data, headers: [] });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    return <Form
        onSubmit={(data: any) => submit(data)}
        form={formData}
        submitButton={{ className: 'mt-20', title: 'Go', type: 'submit' }}
        className={'row flex-column position-center'}
    />;
};
