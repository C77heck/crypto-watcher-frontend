
import * as React from 'react';
import { Backdrop } from './backdrop';

export const Spinner = (props: any) => {

    if (props.overlay) {
        return <React.Fragment>
            <Backdrop />
            <SvgSpinner />
        </React.Fragment>;
    }

    return <SvgSpinner />;
}

export const SvgSpinner = (props: any) => {
    return <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path1" cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
        <circle className="path2" cx="25" cy="25" r="15" fill="none" strokeWidth="2"></circle>
        <circle className="path3" cx="25" cy="25" r="10" fill="none" strokeWidth="2"></circle>
        <circle className="path4" cx="25" cy="25" r="5" fill="none" strokeWidth="2"></circle>
    </svg>;
}
