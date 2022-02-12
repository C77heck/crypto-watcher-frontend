import { Repository } from './repository';
import { Response } from './Response';

export const fetch = async (path: string, options: RequestInit): Promise<Response> => {
    const repository = new Repository();
    repository.setHeader('Content-Type', 'application/json');
    try {
        const payload = await repository.get(path, options);
        return new Response({ payload });
    } catch (error) {
        return new Response({ error, errorMessage: 'Something went wrong' });
    }
};

