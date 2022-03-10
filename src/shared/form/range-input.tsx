import React, { Component } from 'react';

export class RangeInput extends Component<any, any> {
    public render() {
        return <input
            className={'range-input'}
            onChange={(e) => this.props.handleChange(e)}
            value={this.props.value}
            type={'range'}
            name={this.props.name}
            id={this.props.id}
            readOnly={this.props.readOnly}
            required={this.props.required}
            placeholder={this.props.placeholder}
            autoComplete={this.props.autoComplete}
            disabled={this.props.disabled}
            min={this.props.min}
            max={this.props.max}
        />;
    }
}
