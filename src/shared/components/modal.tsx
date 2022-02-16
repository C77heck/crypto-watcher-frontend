import * as React from 'react';
import ReactDOM from 'react-dom';
import { Close } from './icons';
import { Portal } from './portal';

interface SizeProps {
    sm: number;
    md: number;
    lg: number;
}

interface ModalProps {
    content: JSX.Element;
    trigger?: JSX.Element;
    className?: string;
    contentClasses?: string;
    headerClasses?: string;
    size: SizeProps; // use grid and up to 100
    header?: JSX.Element;
    show?: boolean;
}

export class Modal extends React.Component<ModalProps, any> {
    public state = {
        show: false,
        screenSize: 1500,
    };

    public componentDidMount() {
        window.addEventListener('resize', (size) => this.checkSize(size));
        if (!this.props.trigger) {
            this.setState({ show: this.props.show });
        }
    }

    public componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', (size) => this.checkSize(size));
    }

    public checkSize({ target: { innerWidth } }: any) {
        this.setState({ screenSize: innerWidth });
    }

    public getSize(sizes: SizeProps) {
        const size = this.getSizeByScreen(sizes);
        const modal = `col-${size}`;
        const sides = `left-${Math.round((100 - size) / 2)}`;

        return { modal, sides };
    }

    public getSizeByScreen({ sm, md, lg }: SizeProps): number {
        if (this.state.screenSize < 700) {
            return sm;
        }
        if (this.state.screenSize < 1000) {
            return md;
        }

        return lg;
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
            <Portal elementId={'modals'} >
                <div>
                    {this.renderOverlay()}
                    {this.renderModal()}
                </div>
            </Portal>
        </div>;
    }
}

