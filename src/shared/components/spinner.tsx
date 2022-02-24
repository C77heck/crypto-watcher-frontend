import * as React from 'react';
import { Backdrop } from './backdrop';
import { Portal } from './portal';

export const Spinner = (props: any) => {
    const asOverlay = props.asOverlay && <React.Fragment><Backdrop/><SvgSpinner/></React.Fragment>;

    return props.asOverlay ? asOverlay : <SvgSpinner/>;
};

export const SvgSpinner = (props: any) => {
    return <Portal elementId={'spinner'}>
        <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path1" cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
            <circle className="path2" cx="25" cy="25" r="15" fill="none" strokeWidth="2"></circle>
            <circle className="path3" cx="25" cy="25" r="10" fill="none" strokeWidth="2"></circle>
            <circle className="path4" cx="25" cy="25" r="5" fill="none" strokeWidth="2"></circle>
        </svg>
    </Portal>;
};
