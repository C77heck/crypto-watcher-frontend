import React from 'react';

export const ErrorScreen = (props: any) => {
    return <div className={'full-screen'}>
        <h2 className={'pt-40 text-align-center fw--700 fs-50 text-color--error-1'}>ERROR</h2>
        <h2 className={'pt-40 text-align-center fw--700 fs-50 text-color--error-2'}>
            You do not have the right permissions for this content!
        </h2>
        <div className={'w-100 position-center pt-60'}>
            <a href={'/'} className={'cursor-pointer text-decoration-none fs-28 hover-green pb-sm-0 pb-30'}>Back to the main page</a>
        </div>
    </div>;
};
