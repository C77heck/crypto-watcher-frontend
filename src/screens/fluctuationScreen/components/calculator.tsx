import { useEffect, useState } from 'react';
import { CONSTANTS } from '../../../shared/constants';
import { Field } from '../../../shared/form/field';
import Input from '../../../shared/form/input';
import { priceFormat } from '../../../shared/libs/helpers';

export const Calculator = (props: any) => {
    const { INPUTS: { RANGE } } = CONSTANTS;
    // money spent minus its transaction fee. need calculator range input to see on percentage increases how much it would
    // appreciate in value
    const { price } = props.data;
    const [investment, setInvestment] = useState(0);
    const [fee, setFee] = useState(0);
    const [result, setResult] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [priceMotion, setPriceMotion] = useState(100);
    const [range, setRange] = useState(100);

    useEffect(() => {
        console.log({priceMotion});
        const costOfPurchase = investment * (1 + fee) - investment;
        const costOfSale = investment * priceMotion * fee;
        // console.log({ costOfPurchase, costOfSale, result: investment * priceMotion, quantity: price / investment });
        setResult((investment * priceMotion) - (costOfPurchase + costOfSale));
        setQuantity(price / investment);
    }, [fee, investment, priceMotion]);

    const priceField = new Field({
        name: 'price',
        label: 'Money to invest',
        value: investment,
        validators: [],
        className: 'col-60',
        isNumberOnly: true,
        getData: ({ value }: any) => setInvestment(value)
    });
    const transactionFeeField = new Field({
        name: 'fee',
        label: 'Transaction fee',
        value: fee * 100,
        validators: [],
        className: 'col-30',
        isNumberOnly: true,
        getData: ({ value }: any) => setFee((value / 100))
    });
    const priceFluctuation = new Field({
        name: 'price-fluctuation',
        label: 'Value fluctuation',
        value: priceMotion * 100,
        validators: [],
        className: 'col-100',
        element: RANGE,
        getData: ({ value }: any) => setPriceMotion(value / 100)
    });

    return <div>
        <div className={'row pb-20 justify-content-space-between'}>
            <Input {...priceField}/>
            <Input {...transactionFeeField}/>
            <Input {...priceFluctuation}/>
        </div>
        <div className={'row pb-20'}>
            <h3 className={'col-50 fs-20 fw--600'}>{`Calculated ${result > investment ? 'Profit' : 'Loss'}`}:</h3>
            <h3 className={'col-50 fs-22 fw--600'}>{priceFormat(result)}</h3>
        </div>
        <div className={'row pb-20'}>
            <h3 className={'col-50 fs-20 fw--600'}>Quantity:</h3>
            <h3 className={'col-50 fs-22 fw--600'}>{quantity}</h3>
        </div>
    </div>;
};
