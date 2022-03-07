import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useClient } from '../hooks/client';

export const LatestListings = (prop: any) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { client } = useClient();
    const getLatestListings = async () => {
        if (!isLoggedIn) {
            return;
        }

        await client('/crypto/latest_listings', 'get', {});
    };

    return <div
        onClick={getLatestListings}
    >
        <p className={'text-color--light-1'}>
            Latest listings
        </p>
    </div>;
};
