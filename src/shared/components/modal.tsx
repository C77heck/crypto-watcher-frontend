import * as React from 'react';
import ReactDOM from 'react-dom';
import { Close } from './icons';

interface ModalProps {
    content: JSX.Element;
    trigger: JSX.Element;
    className?: string;
    contentClasses?: string;
    headerClasses?: string;
    size: number; // use grid and up to 100
    header?: JSX.Element;
}

function ModalWrapper(props: any) {
    return ReactDOM.createPortal(props.children, document.getElementById('modals') as any);
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
                {header && header}
                <Close
                    className={'float-right hover-opacity'}
                    width={'w-px-21'}
                    onClick={() => this.setState({ show: false })}
                />
            </div>
            <div className={`${contentClasses} p-20`}>
                {content}
            </div>
        </div>;
    }

    public render() {
        return <div>
            <div onClick={(e: any) => this.handleClick(e, true)}>
                {!!this.props.trigger && this.props.trigger}
            </div>
            <ModalWrapper>
                <div>
                    {this.renderOverlay()}
                    {this.renderModal()}
                </div>
            </ModalWrapper>
        </div>;
    }
}

