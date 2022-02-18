import { FieldProps } from './input';

export class FormStructure {
    public fields: FieldProps[];

    public constructor(fields: FieldProps[]) {
        this.fields = fields;
    }
}
