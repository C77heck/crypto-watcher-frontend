import React, { Component } from "react";
import { CONSTANTS } from '../constants';
import { RangeInput } from './range-input';
import { SearchableDropdown } from './searchable-dropdown';
import { TextInput } from './text-input';
import { ValidatorInterface } from './validators/validator-interface';

export interface FieldProps {
    type?: string;
    name: string;
    id?: string | undefined;
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    className?: string | undefined;
    validators?: any[]; // TODO -> we will need a validator interface here.
    getData: (value: any, hasError: boolean) => void;
    errorMessage?: string;
    label?: string;
    options?: string[];
    element?: 'text' | 'dropdown' | 'searchable' | 'searchable_dropdown' | 'textarea';
    isNumberOnly?: boolean;
    value: string | null;
    onChange?: (value: string) => void;
    inputClasses?: string;
}

class Input extends Component<FieldProps, any> {
    public state = { value: '', hasError: false, errorMessage: '' };
    public prodRef: any;

    constructor(props: any) {
        super(props);
        this.prodRef = React.createRef();
    }

    public componentDidMount() {
        if (!!this.props.value) {
            this.setState({ value: this.props.value });
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.value !== this.state.value) {
            this.getData();
        }
    }

    public validate(value: string): ValidatorInterface {
        const hasErrors = !!this.props.validators && !!this.props.validators.length
            ? this.props.validators.map((validator: any) => validator(value))
            : [];

        if (!hasErrors.length) {
            return { hasError: false, errorMessage: '' };
        }

        return hasErrors[0];
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        const { hasError, errorMessage } = this.validate(value);
        if (this.props.isNumberOnly) {
            this.setState({ value: this.removeNonNumericValues(value), hasError, errorMessage });
        } else {
            this.setState({ value, hasError, errorMessage });
        }

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    public removeNonNumericValues(value: string) {
        const isNumeric = /^-?\d*\.?\d*$/;
        return value.split('').filter(v => isNumeric.test(v)).join('');
    }

    public getData() {
        if (this.props.getData) {
            this.props.getData({ name: this.props.name, value: this.state.value }, !this.state.hasError);
        }
    }

    public onClickHandler(isChosen: boolean, option: string) {
        this.setState({ value: isChosen ? '' : option });
    }

    public manageInputType(element: string) {
        const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN, RANGE } } = CONSTANTS;
        switch (element) {
            case DROPDOWN:
                return <TextInput
                    {...this.props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                />; // will need the dropdown
            case SEARCHABLE:
                return <TextInput
                    {...this.props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                />; // will need the dropdown
            case SEARCHABLE_DROPDOWN:
                return <SearchableDropdown
                    {...this.props}
                    divRef={this.prodRef}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                    onClickHandler={(isChosen: boolean, value: string) => this.onClickHandler(isChosen, value)}
                />;
            case TEXTAREA:
                return <TextInput
                    {...this.props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                />;  // will need the textarea
            case RANGE:
                return <RangeInput
                    {...this.props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                />;
            default:
                return <TextInput
                    {...this.props}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                    value={this.state.value}
                />;
        }
    }

    public render() {
        const hasError = this.state.hasError;

        return <div
            className={`display-flex flex-column ${this.props.className}`}
            ref={this.prodRef}
        >
            {this.props.label && <label className={`input-label error-${hasError ? 'show' : 'hide'}--label`} htmlFor={this.props.name}>{this.props.label}</label>}
            <div
                className={`input-wrapper ${this.props.inputClasses} error-${hasError ? 'show' : 'hide'}--div`}
            >
                {this.manageInputType(this.props.element || 'text')}
            </div>
            {!!hasError && <small className={'error-show'}>{this.props.errorMessage}</small>}
        </div>;
    }
}

export default React.memo(Input);
