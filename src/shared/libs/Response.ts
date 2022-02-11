export interface FetchProps {
    hasError?: boolean;
    payload?: any;
    error?: any;
    errorMessage?: string;
}

export class Response implements FetchProps {
    public hasError;
    public payload;
    public error;
    public errorMessage;

    public constructor(data: FetchProps) {
        this.payload = data?.payload || null;
        this.error = data?.error || null;
        this.hasError = !!data?.error;
        this.errorMessage = data?.errorMessage || '';
    }
}
