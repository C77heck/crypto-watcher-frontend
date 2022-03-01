import { Field } from '../../../shared/form/field';
import Input from '../../../shared/form/input';

export const SearchBar = (props: any) => {
    const field = new Field({
        name: 'search',
        label: 'Search',
        placeholder: 'Start typing...',
        value: '',
        validators: [],
        className: '',
        inputClasses: 'sum-values py-5',
        onChange: (value: string) => props.onSearch(value)
    });

    return <div className={'min-width-350 mr-13'}>
        <Input {...field}/>
    </div>;
};
