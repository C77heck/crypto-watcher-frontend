import { Field } from '../../../shared/form/field';
import Input from '../../../shared/form/input';

export const SearchBar = (props: any) => {
    const field = new Field({
        name: 'search',
        label: 'Search',
        placeholder: 'Start typing...',
        value: props?.data?.name || null,
        validators: [],
        options: props?.options || [],
        className: 'col-100'
    });
    return <div>
        <Input {...field}/>
    </div>;
};
