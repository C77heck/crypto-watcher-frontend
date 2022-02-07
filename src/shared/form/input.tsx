import { Component } from "react";

export class Input extends Component<any, any> {
    public state = { value: '', errors: [] };
    public values: any[] = [];

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.value !== this.state.value) {
            console.log(this.values);
        }
    }

    public validate(value: string) {
        return !!this.props.validator ? this.props.validator(value) : true;
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value, errors: this.validate(value) });
    }

    public getData() {
        if (this.props.getData) {
            this.props.getData(this.state.value, this.state.errors);
        }
    }

    public render() {
        const hasError = true; // !!this.state.errors.length;
        return <div className={'display-flex flex-column'}>
            <div
                className={`input-wrapper ${this.props.classNames} error-${hasError ? 'show' : 'hide'}`}
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
