import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
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
    public className;
    public validators;
    public getData;
    public errorMessage;
    public label;
    public element;
    public options;
    public isNumberOnly;
    public value;
    public onChange;
    public inputClasses;
    public min;
    public max;

    public constructor(attributes: any) {
        this.type = attributes?.type || 'text';
        this.name = attributes?.name;
        this.id = attributes?.id || generateUniqueID();
        this.readOnly = attributes?.readOnly || false;
        this.required = attributes?.required || false;
        this.placeholder = attributes?.placeholder || '';
        this.autoComplete = attributes?.autoComplete || 'false';
        this.disabled = attributes?.disabled || false;
        this.className = attributes?.className || '';
        this.validators = attributes?.validators || [];
        this.getData = attributes?.getData;
        this.errorMessage = attributes?.errorMessage || '';
        this.label = attributes?.label || '';
        this.element = attributes?.element || 'text';
        this.options = attributes?.options || [];
        this.isNumberOnly = attributes?.isNumberOnly || false;
        this.value = attributes?.value || null;
        this.onChange = attributes?.onChange || null;
        this.inputClasses = attributes?.inputClasses || '';
        if (this.element === 'range') {
            this.min = attributes?.min || 0;
            this.max = attributes?.max || 100;
        }
    }
}
