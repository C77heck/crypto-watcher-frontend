import { Component } from "react";
import { from, Observable } from "rxjs";

export class Input extends Component<any, any> {
    public state = { value: '' };
    public values: any[] = [];
    public arr: Observable<any> = from(this.values);
    public observable = new Observable(subscriber => {
        const val = this.state.value;
        subscriber.next(() => console.log('got logged', this.state.value, val));
    });

    public componentDidMount() {
        this.arr.subscribe(sub => console.log('got fired', sub));
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.value !== this.state.value) {
            console.log(this.values, this.arr);
        }
    }

    public handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value });
        this.values.push(value);

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
        />;
    }
}
