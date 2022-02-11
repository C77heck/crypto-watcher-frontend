import { Repository } from './repository';
import { FetchProps, Response } from './Response';

export const fetch = async (path: string, options: RequestInit): Promise<FetchProps> => {
    const { get } = new Repository();
    try {
        const payload = await get(path, options);
        return new Response({ payload });
    } catch (error) {
        return new Response({ error, errorMessage: 'Something went wrong' });
    }
};

