import {useEffect, useState} from 'react';
import {CONSTANTS} from '../../../shared/constants';
import {Field} from '../../../shared/form/field';
import Input from '../../../shared/form/input';
import {priceFormat} from '../../../shared/libs/helpers';

export const Calculator = (props: any) => {
    const {INPUTS: {RANGE}} = CONSTANTS;
    const {price} = props.data;
    const [investment, setInvestment] = useState(1);
    const [fee, setFee] = useState(1.5 / 100);
    const [result, setResult] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [priceMotion, setPriceMotion] = useState(100);

    useEffect(() => {
        const priceChange = priceMotion / 100;
        const costOfPurchase = investment * (1 + fee) - investment;
        const costOfSale = investment * priceChange * fee;
        setResult((investment * priceChange) - (costOfPurchase + costOfSale));
        console.log({price, investment});
        setQuantity(investment / price);
    }, [fee, investment, priceMotion]);

    const priceField = new Field({
        name: 'price',
        label: 'Money to invest',
        value: investment,
        validators: [],
        className: 'col-60',
        isNumberOnly: true,
        onChange: (value: any) => setInvestment(value)
    });
    const transactionFeeField = new Field({
        name: 'fee',
        label: 'Transaction fee',
        value: fee * 100,
        validators: [],
        className: 'col-30',
        isNumberOnly: true,
        onChange: (value: any) => setFee((value / 100))
    });
    const priceFluctuation = new Field({
        name: 'price-fluctuation',
        label: 'Value fluctuation',
        value: priceMotion,
        min: 0,
        max: 200,
        inputClasses: 'border-none',
        validators: [],
        className: 'col-80 pt-10',
        element: RANGE,
        onChange: (value: any) => setPriceMotion(value)
    });
    const fluctuation = new Field({
        name: 'price-fluctuation-in-number',
        label: '',
        value: priceMotion,
        validators: [],
        className: 'col-80',
        onChange: (value: any) => setPriceMotion(value)
    });


    return <div>
        <div className={'row pb-20 justify-content-space-between'}>
            <Input {...priceField}/>
            <Input {...transactionFeeField}/>
            <Input {...priceFluctuation}/>
            <div className={'col-20 display-flex align-items-end justify-content-end mb-13'}>
                <Input {...fluctuation}/>
            </div>
        </div>
        <div className={'row pb-20'}>
            <p className={'col-50 fs-20 fw--600'}>{`Calculated ${result > investment ? 'Profit' : 'Loss'}`}:</p>
            <p className={'col-50 fs-22 fw--600'}>{priceFormat(result)}</p>
        </div>
        <div className={'row pb-20'}>
            <p className={'col-50 fs-20 fw--600'}>Quantity:</p>
            <p className={'col-50 fs-22 fw--600'}>{quantity}</p>
        </div>
    </div>;
};
