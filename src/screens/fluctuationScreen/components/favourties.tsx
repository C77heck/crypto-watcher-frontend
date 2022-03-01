import { useContext, useState } from 'react';
import { FavouriteIcon } from '../../../shared/components/icons';
import { AuthContext } from '../../../shared/context/auth.context';
import { Repository } from '../../../shared/libs/repository';

export const Favourties = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);
    const request = new Repository(token);
    // figure how to clear redis cache.
    const manageFavourite = () => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await request.post('/crypto/start-following', { body: { cryptoId: props.data?.identifier } as any });
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
            }
        })();
    };
    return <div onClick={manageFavourite} className={'w-100'}>
        <FavouriteIcon width={30} className={'hover-primary'}/>
    </div>;
};
