import { Component, Fragment } from "react";
import { CONSTANTS } from '../constants';
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
}

export class Input extends Component<FieldProps, any> {
    public state = { value: '', hasError: false, errorMessage: '', searchedOptions: [] };

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
        this.setState({ value, hasError, errorMessage });
    }

    public getData() {
        if (this.props.getData) {
            this.props.getData({ name: this.props.name, value: this.state.value }, !this.state.hasError);
        }
    }

    public textInput() {
        return <input
            className={'input'}
            onChange={(e) => this.handleChange(e)}
            value={this.state.value}
            type={this.props.type || 'text'}
            name={this.props.name}
            id={this.props.id}
            readOnly={this.props.readOnly}
            required={this.props.required}
            placeholder={this.props.placeholder}
            autoComplete={this.props.autoComplete}
            disabled={this.props.disabled}
        />;
    }

    public searchableInput() {
        return <input
            className={'input'}
            onChange={(e) => this.handleChange(e)}
            value={this.state.value}
            type={this.props.type || 'text'}
            name={this.props.name}
            id={this.props.id}
            readOnly={this.props.readOnly}
            required={this.props.required}
            placeholder={this.props.placeholder}
            autoComplete={this.props.autoComplete}
            disabled={this.props.disabled}
        />;
    }

    public searchableDropdown() {
        return <Fragment>
            <input
                className={'input'}
                onChange={(e) => this.handleChange(e)}
                value={this.state.value}
                type={this.props.type || 'text'}
                name={this.props.name}
                id={this.props.id}
                readOnly={this.props.readOnly}
                required={this.props.required}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                disabled={this.props.disabled}
            />
            <div
                className={`input-dropdown ${this.manageOptions()}`}
            >
                <ul>
                    {(this.props.options || []).map(option => this.renderOption(option))}
                </ul>
            </div>
        </Fragment>;
    }

    public renderOption(option: string) {
        return <li
            onClick={() => this.setState({ value: option })}
        >
            {option}
        </li>;
    }

    public manageOptions() {
        const hasValue = !!this.state.value;
        const hasOptions = !!this.props.options?.length;
        // TODO will need to move it to state and search through it.

        if (hasValue && hasOptions) {
            return 'dropdown--show';
        }
        return 'dropdown--hide';
    }

    public manageInputType(element: string) {
        const { INPUTS: { TEXTAREA, SEARCHABLE, SEARCHABLE_DROPDOWN, DROPDOWN } } = CONSTANTS;

        switch (element) {
            case DROPDOWN:
                return this.textInput(); // will need the dropdown
            case SEARCHABLE:
                return this.searchableInput();  // will need the searchable
            case SEARCHABLE_DROPDOWN:
                return this.searchableDropdown();
            case TEXTAREA:
                return this.textInput();  // will need the textarea
            default:
                return this.textInput();
        }
    }

    public render() {
        const hasError = this.state.hasError;
        return <div className={`display-flex flex-column ${this.props.className}`}>
            {this.props.label && <label className={`input-label error-${hasError ? 'show' : 'hide'}--label`} htmlFor={this.props.name}>{this.props.label}</label>}

            <div
                className={`input-wrapper error-${hasError ? 'show' : 'hide'}--div`}
            >
                {this.manageInputType(this.props.element || 'text')}
            </div>
            {!!hasError && <small className={'error-show'}>{this.props.errorMessage}</small>}
        </div>;
    }
}
