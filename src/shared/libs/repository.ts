// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
import { HttpError } from './http-error';
import { QueryManager } from './query.manager';

export class Repository {
    public baseUrl = process.env.REACT_APP_BASE_URL;
    public headers: string[][] = [['Content-Type', 'application/json']];

    public constructor(token: string | null = null) {
        if (token) {
            this.setAuth(token);
        }
    }

    public setHeader(header: string, value: string) {
        this.headers.push([header, value]);
    }

    public setAuth(token: string | null) {
        this.headers.push(['Authorization', `Bearer ${token}`]);
    }

    public async request(path: string, options: RequestInit, method: string, query: any) {
        const abortController = new AbortController();
        try {
            console.log(this.formatUrl(path, query));
            const request = new Request(this.formatUrl(path, query), this.formatOptions(options, abortController, method));
            const response = await fetch(request);
            const responseData = await response.json();

            if (!response.ok) {
                throw new HttpError(responseData?.message, responseData?.statusCode);
            }

            return responseData;
        } catch (error: any) {
            abortController.abort();
            throw new HttpError(error?.message, error?.code);
        }
    }

    public formatUrl(url: string, query: any = null): string {
        if (!query) {
            return url;
        }

        const queryManager = new QueryManager();

        for (const prop in query) {
            if (query.hasOwnProperty(prop)) {
                queryManager.add(prop, query[prop]);
            }
        }

        return `${url}?${queryManager.getQuery()}`;
    }

    public formatOptions(options: any, abortController: AbortController, method: string) {
        options.signal = abortController.signal;
        options.method = method;
        options.headers = this.headers;
        if (method !== 'GET') {
            options.body = JSON.stringify(options.body || {}, null);
        }

        return options;
    }

    public async get(url: string, options: RequestInit, query: any = null) {
        return await this.request(`${this.baseUrl}${url}`, options, 'GET', query);
    }

    public async post(url: string, options: RequestInit, query: any = null) {
        return await this.request(`${this.baseUrl}${url}`, options, 'POST', query);
    }

    public async put(url: string, options: RequestInit, query: any = null) {
        return await this.request(`${this.baseUrl}${url}`, options, 'PUT', query);
    }

    public async patch(url: string, options: RequestInit, query: any = null) {
        return await this.request(`${this.baseUrl}${url}`, options, 'PATCH', query);
    }

    public async delete(url: string, options: RequestInit, query: any = null) {
        return await this.request(`${this.baseUrl}${url}`, options, 'DELETE', query);
    }

}
