import { Component } from "react";
import { Observable } from "rxjs";

// TODO ->  const formData = new FormData(); to be used.

export class Input extends Component<any, any> {
    public state = { value: '' };

    public observable = new Observable(subscriber => {
        const val = this.state.value;
        subscriber.next(() => console.log('got logged', this.state.value, val));
    });

    public componentDidMount() {
        this.observable.subscribe(value => console.log(value))
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value });
    }

    public render() {
        return <input
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
    }
}