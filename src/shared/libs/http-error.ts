export class HttpError extends Error {
    public message: string;
    public code: number;
    public constructor(message: string, code: number) {
        super();
        this.message = message;
        this.code = code;
    }
}
