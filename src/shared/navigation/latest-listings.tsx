import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Repository } from '../libs/repository';

export const LatestListings = (prop: any) => {
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository();
    request.setAuth(token);

    const getLatestListings = async () => {
        if (!isLoggedIn) {
            return;
        }

        const response = await request.get('/crypto/latest_listings', { headers: [] });
        console.log(response);
    };
    return <div
        onClick={getLatestListings}
    >
        <p className={'text-color--light-1'}>
            Latest listings
        </p>
    </div>;
};
