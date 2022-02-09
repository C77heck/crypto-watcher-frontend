import { Component } from "react";

export interface FieldProps {
    type?: string;
    name: string;
    id?: string | undefined;
    readOnly?: boolean;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    classNames?: string | undefined;
    validators?: any[]; // TODO -> we will need a validator interface here.
    getData: (value: any, errors: any[]) => void;
    errorMessage?: string;
    label?: string;
}

export class Input extends Component<FieldProps, any> {
    public state = { value: '', errors: [] };

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.value !== this.state.value) {
            this.getData();
        }
    }

    public validate(value: string): { hasError: boolean, errorMessage: string }[] {
        return !!this.props.validators && !!this.props.validators.length
            ? this.props.validators.map((validator: any) => validator(value))
            : [{ hasError: false, errorMessage: '' }];

        // we need to return either true or false if its false we should return the error messgage too.
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        const { hasError, errorMessage } = this.validate(value);
        this.setState({ value, hasError, errorMessage });
    }

    public getData() {
        if (this.props.getData) {
            this.props.getData({ name: this.props.name, value: this.state.value }, this.state.errors);
        }
    }

    public render() {
        const hasError = !!this.state.errors.length;
        return <div className={'display-flex flex-column'}>
            {this.props.label && <label className={`input-label error-${hasError ? 'show' : 'hide'}--label`} htmlFor={this.props.name}>{this.props.label}</label>}

            <div
                className={`input-wrapper ${this.props.classNames} error-${hasError ? 'show' : 'hide'}--div`}
            >
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
            </div>
            {!!hasError && <small className={'error-show'}>{this.props.errorMessage}</small>}
        </div>;
    }
}
