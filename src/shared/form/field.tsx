import { FieldProps } from "./input";

export class Field implements FieldProps {
    public type;
    public name;
    public id;
    public readOnly;
    public required;
    public placeholder;
    public autoComplete;
    public disabled;
    public classNames;
    public validator;
    public getData;
    public errorMessage;
    public label;

    public constructor(attributes: any) {
        this.type = attributes?.type || 'text';
        this.name = attributes?.name;
        this.id = attributes?.id || '';
        this.readOnly = attributes?.readOnly || false;
        this.required = attributes?.required || false;
        this.placeholder = attributes?.placeholder || '';
        this.autoComplete = attributes?.autoComplete || 'false';
        this.disabled = attributes?.disabled || false;
        this.classNames = attributes?.classNames || '';
        this.validator = attributes?.validator || [];
        this.getData = attributes?.getData;
        this.errorMessage = attributes?.errorMessage || '';
        this.label = attributes?.label || '';
    }
}
