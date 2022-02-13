import React, { Component } from 'react';

export class TextInput extends Component<any, any> {
    public render() {
        return <input
            className={'input'}
            onChange={(e) => this.props.handleChange(e)}
            value={this.props.value}
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
