import { useState } from 'react';
import { Button } from '../../../shared/components/button';
import { Input } from '../../../shared/form/input';
import { onlyStringsValidator } from '../../../shared/form/validators/only-strings-validator';

export const NewCryptoForm = (props: any) => {
    const [form, setForm] = useState({});
    const getData = (data: any, isValid: any) => {
        console.log(data);
        setForm({ ...form, [data?.name]: { value: data?.value, isValid: isValid } });

    };
    const config = {
        first: {
            name: 'crypto-name',
            getData: (data: any, isValid: any) => getData(data, isValid)
        },
        second: {
            name: 'purchased-amount',
            getData: (data: any, isValid: any) => getData(data, isValid)
        },
        third: {
            name: 'threshold-1',
            getData: (data: any, isValid: any) => getData(data, isValid)
        },
        fourth: {
            name: 'threshold-2',
            getData: (data: any, isValid: any) => getData(data, isValid)
        },
        fifth: {
            name: 'threshold-3',
            getData: (data: any, isValid: any) => getData(data, isValid)
        },
    };

    const submit = (e: any) => {
        e.preventDefault();
        console.log({ e, form });
    };

    return <form onSubmit={(e) => submit(e)}>
        <Input
            {...config.first}
            validator={(data: any) => onlyStringsValidator(data)}
            errorMessage={'whaaat?'}
        />
        <Input
            {...config.second}
            validator={(data: any) => onlyStringsValidator(data)}
            errorMessage={'whaaat?'}
        />
        <Input
            {...config.third}
            validator={(data: any) => onlyStringsValidator(data)}
            errorMessage={'whaaat?'}
        />
        <Input
            {...config.fourth}
            validator={(data: any) => onlyStringsValidator(data)}
            errorMessage={'whaaat?'}
        />
        <Input
            {...config.fifth}
            validator={(data: any) => onlyStringsValidator(data)}
            errorMessage={'whaaat?'}
        />
        <Button
            title={'Go'}
            type={'submit'}
        />
    </form>;
};
