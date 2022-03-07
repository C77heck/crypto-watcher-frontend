import { useEffect, useState } from 'react';
import { Field } from '../../../shared/form/field';
import Input from '../../../shared/form/input';

export const Calculator = (props: any) => {
    // money spent minus its transaction fee. need calculator range input to see on percentage increases how much it would
    // appreciate in value
    const [prediction, setPredicition] = useState({ price: 0, fee: 0 });
    const [result, setResult] = useState(0);
    const onChangeHandler = ({ name, value }: any) => {
        setPredicition(() => ({ ...prediction, [name]: value }));
    };

    useEffect(() => {
        const { price, fee } = prediction;
        console.log('triggered', prediction, price, fee);
        setResult(price * fee);
    }, [prediction]);

    const priceField = new Field({
        name: 'price',
        label: 'Money to invest',
        value: 0,
        validators: [],
        className: 'col-60',
        isNumberOnly: true,
        getData: (value: any) => onChangeHandler(value)
    });
    const transactionFeeField = new Field({
        name: 'fee',
        label: 'Transaction fee',
        value: 1.5,
        validators: [],
        className: 'col-30',
        isNumberOnly: true,
        getData: (value: any) => onChangeHandler(value)
    });

    return <div>
        <div className={'row justify-content-space-between'}>
            <Input {...priceField}/>
            <Input {...transactionFeeField}/>
        </div>
        <h3 className={'fs-24 fw--600'}>{result}</h3>
    </div>;
};
