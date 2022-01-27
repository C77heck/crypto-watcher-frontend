import * as React from 'react';

interface ModalProps {
    trigger: () => React.ReactNode;
    content: () => React.ReactNode;
    className?: string;
    contentClasses?: string;
    headerClasses?: string;
    size: number; // use grid and up to 100
    header?: string;
}
export class Modal extends React.Component<ModalProps, any> {
    public state = {
        show: false,
    };
    public getSize(size: number) {
        const modal = `col-${size}`;
        const sides = `left-${Math.round((100 - size) / 2)}`;
        return { modal, sides };
    }
    public handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, val: boolean) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ show: val });
    }
    public renderOverlay() {
        const { show } = this.state;
        return <div
            className={`overlay overlay--${show ? 'show' : 'hide'}`}
            onClick={(e) => this.handleClick(e, false)}
        />;
    }
    public renderModal() {
        const { className, content, size, contentClasses, headerClasses, header } = this.props;
        const { modal, sides } = this.getSize(size);
        const { show } = this.state;
        return <div
            className={`z-110 modal modal--${show ? 'show' : 'hide'} ${sides} ${modal} ${className}`}
        >
            <div className={headerClasses}>
                <h2 className={'fw-bold text-align-center'}>{header}</h2>
                <p className={'float-right'}>X</p>
            </div>
            <div className={contentClasses}>
                {content()}
            </div>
        </div>;
    }
    public render() {
        return <div>
            <div
                onClick={(e) => this.handleClick(e, true)}
            >
                {this.props.trigger()}
            </div>
            {this.renderOverlay()}
            {this.renderModal()}
        </div>;
    }
}
