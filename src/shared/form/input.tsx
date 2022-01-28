import { Component } from "react";

export class Input extends Component<any, any> {
    public state = { value: '' };
    public values: any[] = [];

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.value !== this.state.value) {
            console.log(this.values);
        }
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value });
    }

    public render() {
        return <div className={'input-wrapper'}>
            <input
                className={'input'}
                onChange={(e) => this.handleChange(e)} value={this.state.value}
                type={this.props.type || 'text'}
                name={this.props.name}
                id={this.props.id}
                readOnly={this.props.readOnly}
                required={this.props.required}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                disabled={this.props.disabled}
            />
        </div>;
    }
}
