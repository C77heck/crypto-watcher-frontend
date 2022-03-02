import { useContext, useEffect, useState } from 'react';
import { FavouriteIcon, SpinnerIcon } from '../../../shared/components/icons';
import { AuthContext } from '../../../shared/context/auth.context';
import { Repository } from '../../../shared/libs/repository';

export const Favourties = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const { token } = useContext(AuthContext);
    const request = new Repository(token);

    useEffect(() => {
        console.log('FIRED', props.data?.isFavourite);
        setIsFavourite(props.data?.isFavourite);
    }, [props.data?.isFavourite]);

    const isFavouriteClass = isFavourite ? 'color-custom--gold' : 'color-custom--grey';

    const manageOnClick = () => {
        (async () => {
            try {
                setIsLoading(true);
                await manageFavourite(isFavourite ? 'remove-from--favourites' : 'add-to-favourites');
                setIsLoading(false);
                setIsFavourite(!isFavourite);
            } catch (e) {
                setIsLoading(false);
            }
        })();
    };

    const manageFavourite = async (path: string) => {
        await request.post(`/crypto/${path}`, { body: { cryptoId: props.data?.identifier } as any });
    };

    return <div onClick={manageOnClick} className={'w-100'}>
        {isLoading ? <SpinnerIcon width={30}/> : <FavouriteIcon width={30} className={`${isFavouriteClass} hover-opacity`}/>}
    </div>;
};
