import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth.context';
import { Repository } from '../../shared/libs/repository';
import { Header } from '../components/header';

export const ChangesScreen = (props: any) => {
    const [watched, setWatched] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { token, isLoggedIn } = useContext(AuthContext);

    const request = new Repository(token);

    useEffect(() => {
        if (isLoggedIn || !!shouldRefetch) {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await request.get('/crypto/get_changes_in_value', {});
                    console.log(response?.items || 'Something went wrong');

                    setWatched(response?.items || []);
                    setIsLoading(false);
                } catch (e) {
                    setIsLoading(false);
                }
            })();
        }
    }, [isLoggedIn, shouldRefetch]);

    return <div>
        <Header>
            <h2 className={'header--2'}>Crypto fluctuation</h2>
        </Header>
    </div>;
};

