import * as React from 'react';

interface CellProps {
    type?: 'initial' | 'inherit' | 'unset' | 'row' | 'row-reverse' | 'column' | 'column-reverse' | undefined;
    height?: string;
    width?: string;
    style?: {
        display: string;
        flexDirection: 'initial' | 'inherit' | 'unset' | 'row' | 'row-reverse' |
        'column' | 'column-reverse' | undefined;
        overflow: 'initial' | 'inherit' | 'unset' | 'auto' | 'hidden' | 'scroll' | 'visible' | undefined;
        minHeight: string;
        maxHeight: string;
    };
    className?: string;
}

interface CellState {
    dragging: boolean;
    resizableElement: any;
    style: any;
    className: any;
}

export class Cell extends React.Component<CellProps, CellState> {
    constructor(props: any) {
        super(props);

        var style: any;
        if (this.props.type === 'column') {
            style = {
                flex: '0 0 auto',
                width: '100%',
                height: this.props.height || '30%',
                whiteSpace: 'nowrap',
            };
        } else {
            style = {
                flex: '0 0 auto',
                height: '100%', // this.props.height || ''
                width: this.props.width || '30%',
                whiteSpace: 'nowrap',
            };
        }

        var comparedStyle = {
            ...style,
            ...this.props.style,
        };

        var className = '';
        if (this.props.className !== undefined) {
             className += '' + this.props.className; 
        }

        this.state = {
            dragging: false,
            resizableElement: null,
            style: comparedStyle,
            className: className,
        };
    }
    // className={this.state.className}
    render() {
        return (
            <div style={this.state.style} >
                {this.props.children}
            </div>
        );
    }
}
