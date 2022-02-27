import React, { Component, Fragment } from 'react';

export interface OptionProps {
    id: number | string;
    name: string;
    symbol: string;
    price: number;
}

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
        if (prevProps.value !== this.props.value) {
            this.manageSearch();
        }
    }

    public manageSearch() {
        const regex = new RegExp(this.props.value, 'i');
        this.setState({
            searchedOptions: this.props.options?.filter(({ name }: OptionProps) => regex.test(name))
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
                onKeyDown={(e) => this.manageKeyEvent(e)}
                onKeyDownCapture={(e) => this.manageKeyEvent(e)}
                onKeyPress={(e) => this.manageKeyEvent(e)}
            />
            <div className={`input-dropdown ${this.manageOptions()}`}>
                <ul>
                    {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
                </ul>
            </div>
        </Fragment>;
    }

    public manageKeyEvent({ key }: React.KeyboardEvent<HTMLInputElement>) {
        console.log(key);
        if (key === 'arrowDown') {
            console.log('kind of success');
        }
        switch (key) {
            case 'arrowDown':
                console.log('bitch arrowDown');
                return;
            case 'arrowUp':
                console.log('suck me arrowUp');
                return;
            case 'enter':
                console.log('enter');
                return;
            default:
                return;
        }
    }

    public renderOption({ name, symbol }: OptionProps) {
        const isChosen = this.props.value === name;

        return <li
            onFocus={() => console.log('its on focus', name)}
            key={`${name}-${symbol}`}
            onClick={() => this.props.onClickHandler(isChosen, name)}
            className={`${isChosen && 'text-color--active'}`}
        >
            {name}
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
