// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html

// create a proper Request object. that can be used. then create a proper fetching helper.
import { HttpError } from './http-error';

export class Repository {
    public baseUrl = process.env.REACT_APP_BASE_URL;
    public headers: string[][] = [['Content-Type', 'application/json']];

    public setHeader(header: string, value: string) {
        this.headers.push([header, value]);
    }

    public async get(url: string, options: RequestInit) {
        options.method = 'GET';
        options.headers = [...this.headers, ...(options.headers || []) as any];
        try {
            const request = new Request(`${this.baseUrl}${url}`, options);
            const response = await fetch(request);

            return response.json();
        } catch (error: any) {
            return new HttpError(error.message, error.code);
        }
    }

    public async post(url: string, options: RequestInit) {
        options.method = 'POST';
        options.headers = this.headers;
        options.body = JSON.stringify(options.body, null);
        const request = new Request(`${this.baseUrl}${url}`, options);
        const response = await fetch(request);

        return response.json();
        try {

        } catch (error: any) {
            throw new HttpError(error.message, error.code);
        }
    }

    public async put(url: string, options: RequestInit) {
        options.method = 'PUT';
        options.headers = this.headers;
        options.body = JSON.stringify(options.body, null);
        try {
            const request = new Request(`${this.baseUrl}${url}`, options);
            const response = await fetch(request);

            return response.json();
        } catch (error: any) {

            return new HttpError(error.message, error.code);
        }
    }

    public async patch(url: string, options: RequestInit) {
        options.method = 'PATCH';
        options.headers = this.headers;
        options.body = JSON.stringify(options.body, null);
        try {
            const request = new Request(`${this.baseUrl}${url}`, options);
            const response = await fetch(request);

            return response.json();
        } catch (error: any) {

            return new HttpError(error.message, error.code);
        }
    }

    public async delete(url: string, options: RequestInit) {
        options.method = 'delete';
        options.headers = this.headers;
        options.body = JSON.stringify(options.body, null);
        try {
            const request = new Request(`${this.baseUrl}${url}`, options);
            const response = await fetch(request);

            return response.json();
        } catch (error: any) {

            return new HttpError(error.message, error.code);
        }
    }
}
