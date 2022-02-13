import React, { Component, Fragment } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { CONSTANTS } from '../constants';

export class SearchableDropdown extends Component<any, any> {
    public state = { value: '', hasError: false, errorMessage: '', searchedOptions: [], isInFocus: false };
    public divRef = this.props.divRef;

    constructor(props: any) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidMount() {
        this.assignClickHandler();
    }

    public componentWillUnmount() {
        this.removeClickHandler();
    }

    public assignClickHandler() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public removeClickHandler() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    public handleClickOutside(event: any) {
        if (!this.divRef.current.contains(event.target)) {
            this.setState({ isInFocus: false });
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.value !== this.props.value
            && this.props.element === CONSTANTS.INPUTS.SEARCHABLE_DROPDOWN) {
            this.manageSearch();
        }
    }

    public manageSearch() {
        const regex = new RegExp(this.props.value, 'i');
        this.setState({
            searchedOptions: this.props.options?.filter((option: string) => regex.test(option))
        });
    }

    public searchableDropdown() {
        return <Fragment>
            <input
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
                onFocus={() => this.setState({ isInFocus: true })}
            />
            <div className={`input-dropdown ${this.manageOptions()}`}>
                <ul>
                    {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
                </ul>
            </div>
        </Fragment>;
    }

    public renderOption(option: string) {
        const isChosen = this.props.value === option;
        return <li
            key={generateUniqueID()}
            onClick={() => this.props.onClickHandler(isChosen, option)}
            className={`${isChosen && 'color--active'}`}
        >
            {option}
        </li>;
    }

    public manageOptions() {
        const hasValue = !!this.props.value;
        const hasOptions = !!this.state.searchedOptions?.length;

        if (hasValue && hasOptions && this.state.isInFocus) {
            return 'dropdown dropdown--show';
        }
        return 'dropdown dropdown--hide';
    }

    public render() {
        return this.searchableDropdown();
    }
}
