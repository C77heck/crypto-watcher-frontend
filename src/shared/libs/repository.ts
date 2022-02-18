// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
import { HttpError } from './http-error';

export class Repository {
    public baseUrl = process.env.REACT_APP_BASE_URL;
    public headers: string[][] = [['Content-Type', 'application/json']];
    public abortController = new AbortController();

    public setHeader(header: string, value: string) {
        this.headers.push([header, value]);
    }

    public setAuth(token: string | null) {
        this.headers.push(['Authorization', `Bearer ${token}`]);
    }

    public async request(path: string, options: RequestInit) {
        try {
            const request = new Request(path, options);
            const response = await fetch(request);
            const responseData = await response.json();

            if (!response.ok) {
                throw new HttpError(responseData?.message, responseData?.statusCode);
            }

            return responseData;
        } catch (error: any) {
            this.abortController.abort();
            throw new HttpError(error?.message, error?.code);
        }
    }

    public formatOptions(options: any, method: string) {
        options.signal = this.abortController.signal;
        options.method = method;
        options.headers = this.headers;
        if (method !== 'GET') {
            options.body = JSON.stringify(options.body || {}, null);
        }
        return options;
    }

    public async get(url: string, options: RequestInit) {
        return await this.request(`${this.baseUrl}${url}`, this.formatOptions(options, 'GET'));
    }

    public async post(url: string, options: RequestInit) {
        return await this.request(`${this.baseUrl}${url}`, this.formatOptions(options, 'POST'));
    }

    public async put(url: string, options: RequestInit) {
        return await this.request(`${this.baseUrl}${url}`, this.formatOptions(options, 'PUT'));
    }

    public async patch(url: string, options: RequestInit) {
        return await this.request(`${this.baseUrl}${url}`, this.formatOptions(options, 'PATCH'));
    }

    public async delete(url: string, options: RequestInit) {
        return await this.request(`${this.baseUrl}${url}`, this.formatOptions(options, 'DELETE'));
    }

}
