import { useContext, useEffect, useState } from 'react';
import { FavouriteIcon, SpinnerIcon } from '../../../shared/components/icons';
import { AuthContext } from '../../../shared/context/auth.context';
import { useClient } from '../../../shared/hooks/client';
import { Repository } from '../../../shared/libs/repository';

export const Favourties = (props: any) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const { client, isLoading } = useClient();

    useEffect(() => {
        if (props?.isFavouriteScreen) {
            setIsFavourite(true);
        } else {
            setIsFavourite(props.data?.isFavourite);
        }
    }, [props.data?.isFavourite, props?.isFavouriteScreen]);

    const isFavouriteClass = isFavourite ? 'color-custom--gold' : 'color-custom--grey';

    const manageOnClick = () => {
        (async () => {
            try {
                setIsLoading(true);
                await manageFavourite();
                setIsLoading(false);
                setIsFavourite(!isFavourite);
            } catch (e) {
                setIsLoading(false);
            }
        })();
    };

    const manageFavourite = async () => {
        isFavourite
            ? await request.delete('/crypto/remove-from-favourites', { body: { cryptoId: props.data?.identifier } as any })
            : await request.post('/crypto/add-to-favourites', { body: { cryptoId: props.data?.identifier } as any });

        if (props?.isFavouriteScreen) {
            props?.fetchList();
        }
    };

    return <div onClick={manageOnClick} className={'pr-15 pt-6'}>
        {isLoading ? <SpinnerIcon width={30}/> : <FavouriteIcon width={30} className={`${isFavouriteClass} hover-opacity`}/>}
    </div>;
};
