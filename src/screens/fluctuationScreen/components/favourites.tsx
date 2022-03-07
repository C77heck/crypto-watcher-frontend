import { useEffect, useState } from 'react';
import { FavouriteIcon, SpinnerIcon } from '../../../shared/components/icons';
import { useClient } from '../../../shared/hooks/client';

export const Favourites = (props: any) => {
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
                await manageFavourite();
                setIsFavourite(!isFavourite);
            } catch (e) {
            }
        })();
    };

    const manageFavourite = async () => {
        isFavourite
            ? await client('/crypto/remove-from-favourites', 'delete', { body: { cryptoId: props.data?.identifier } as any })
            : await client('/crypto/add-to-favourites', 'post', { body: { cryptoId: props.data?.identifier } as any });

        if (props?.isFavouriteScreen) {
            props?.fetchList();
        }
    };

    return <div onClick={manageOnClick} className={'pr-15 pt-6'}>
        {isLoading ? <SpinnerIcon width={30}/> : <FavouriteIcon width={30} className={`${isFavouriteClass} hover-opacity`}/>}
    </div>;
};
