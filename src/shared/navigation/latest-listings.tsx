import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Repository } from '../libs/repository';

export const LatestListings = (prop: any) => {
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository(token);

    const getLatestListings = async () => {
        if (!isLoggedIn) {
            return;
        }

        const response = await request.get('/crypto/latest_listings', {});
    };

    return <div
        onClick={getLatestListings}
    >
        <p className={'text-color--light-1'}>
            Latest listings
        </p>
    </div>;
};
