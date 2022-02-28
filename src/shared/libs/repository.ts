// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
import { HttpError } from './http-error';
import { QueryManager } from './query.manager';

interface QueryProps {
    prop?: string;
    value?: any;
}

interface ClientProp extends RequestInit {
    query?: QueryProps;
}

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

    public async request(path: string, options: ClientProp, method: string) {
        const abortController = new AbortController();
        try {
            console.log(this.formatUrl(path, options.query));
            const request = new Request(this.formatUrl(path, options.query), this.formatOptions(options, abortController, method));
            const response = await fetch(request);
            const responseData = await response.json();

            if (!response.ok) {
                throw new HttpError(responseData?.message, responseData?.statusCode);
            }

            return responseData;
        } catch (error: any) {
            console.log('fetching failed', error);
            abortController.abort();
            throw new HttpError(error?.message, error?.code);
        }
    }

    public formatUrl(url: string, query: QueryProps[]): string {
        if (!query || !query.length) {
            return url;
        }
        const queryManager = new QueryManager();
        for (const item of query) {
            queryManager.add(item?.prop, item?.value);
        }

        return `${url}${queryManager.getQuery()}`;
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

    public async get(url: string, options: ClientProp) {
        return await this.request(`${this.baseUrl}${url}`, options, 'GET');
    }

    public async post(url: string, options: ClientProp) {
        return await this.request(`${this.baseUrl}${url}`, options, 'POST');
    }

    public async put(url: string, options: ClientProp) {
        return await this.request(`${this.baseUrl}${url}`, options, 'PUT');
    }

    public async patch(url: string, options: ClientProp) {
        return await this.request(`${this.baseUrl}${url}`, options, 'PATCH');
    }

    public async delete(url: string, options: ClientProp) {
        return await this.request(`${this.baseUrl}${url}`, options, 'DELETE');
    }

}
