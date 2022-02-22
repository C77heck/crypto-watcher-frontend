import { OptionProps } from '../../../shared/form/searchable-dropdown';

export interface ThresholdProps {
    first: number;
    second: number;
    third: number;
}

export interface PurchaseProps {
    name: string;
    price: number;
    amount: number;
    identifier: number;
    symbol: string;
    thresholds: ThresholdProps;
}

export class Purchase implements PurchaseProps {
    public name;
    public price;
    public amount;
    public identifier;
    public symbol;
    public thresholds;

    public constructor(data1: any, data2: any, options: any[]) {
        this.name = data1?.name || data2?.name || '';
        const option = options.filter((op: OptionProps) => op.name === this.name)?.[0] || {};

        this.price = data1?.price || data2?.price || '';
        this.amount = data1?.amount || data2?.amount || '';
        this.identifier = data1?.identifier || data2?.identifier || option?.id || '';
        this.symbol = data1?.symbol || data2?.symbol || option?.symbol || '';
        this.thresholds = {
            first: this.formatThreshold(parseFloat(data1?.first || data2?.first || 0)),
            second: this.formatThreshold(parseFloat(data1?.second || data2?.second || 0)),
            third: this.formatThreshold(parseFloat(data1?.third || data2?.third || 0)),
        };
    }

    public formatThreshold(threshold: number) {
        return threshold > 100 ? threshold : threshold + 100;
    }
}
