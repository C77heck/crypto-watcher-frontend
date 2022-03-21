export const Close = (props: any) => {
    return <div
        className={props.className}
        onClick={props.onClick}
    >
        <svg
            className={props.width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 2">
                <g data-name="close">
                    <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
                    <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                </g>
            </g>
        </svg>
    </div>;
};

export const SpinnerIcon = (props: any) => {
    return <div
        className={`${props.className}`}
    >
        <svg fill="currentColor" className={`w-px-${props.width} spin`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
        </svg>
    </div>;
};

export const ArrowLeft = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 556.424 556.424">
            <path d="M508.094,13.5C511.82,6.043,508.087,0,499.749,0c0,0-205.77,0-205.773,0c-19.045,0.006-44.079,38.363-56.512,52.262
			C215.594,76.711,50.874,259.809,49.681,262.196c-3.727,7.458-3.727,19.544,0,27.001l222.456,253.726
			c3.727,7.458,13.507,13.501,21.843,13.501h205.77c8.335,0,12.071-6.043,8.345-13.501L285.638,289.197
			c-3.728-7.457-3.728-19.544,0-27.001L508.094,13.5z"/>
        </svg>
    </div>;
};

export const ArrowRight = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 490 490">
            <polygon points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0"/>
        </svg>
    </div>;
};

export const FavouriteIcon = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 43.128 43.128">
            <path d="M39.199,15.197H27.668L24.105,4.232c-1.404-4.326-3.68-4.326-5.084,0l-3.563,10.965H3.928
		c-4.545,0-5.25,2.164-1.571,4.836l9.326,6.775L8.121,37.775c-1.404,4.322,0.438,5.662,4.116,2.988l9.326-6.775l9.328,6.775
		c3.678,2.674,5.52,1.334,4.116-2.988l-3.564-10.967l9.326-6.775C44.449,17.361,43.744,15.197,39.199,15.197z"/>

        </svg>
    </div>;
};

export const BarsIcon = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 150 150">
            <path id="XMLID_241_" d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"/>
            <path id="XMLID_242_" d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"/>
            <path id="XMLID_243_" d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"/>
        </svg>
    </div>;
};

export const UserIcon = (props: any) => {
    return <div
        className={`${props.className}`}
        onClick={props.onClick}
    >
        <svg fill="currentColor" className={`w-px-${props.width}`} x="0px" y="0px" viewBox="0 0 459 459">
            <path d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5
			C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314
			c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161
			c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035
			c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"/>
        </svg>
    </div>;
};


