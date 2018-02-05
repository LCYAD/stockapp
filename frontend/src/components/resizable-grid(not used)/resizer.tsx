import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ResizableProps {
    height?: string;
    type: 'initial' | 'inherit' | 'unset' | 'row' | 'row-reverse' | 'column' | 'column-reverse' | undefined;
    fullScreen: boolean;
}

interface ResizableState {
    style: {
        display: string;
        flexDirection: 'initial' | 'inherit' | 'unset' | 'row' | 'row-reverse' |
        'column' | 'column-reverse' | undefined;
        overflow: 'initial' | 'inherit' | 'unset' | 'auto' | 'hidden' | 'scroll' | 'visible' | undefined;
        minHeight: string;
        maxHeight: string;
    };
}

export class Resizable extends React.Component<ResizableProps, ResizableState> {
    constructor(props: ResizableProps) {
        super(props);
        this.state = {
            style: {
                display: 'flex',
                flexDirection: this.props.type || 'row',
                overflow: 'hidden',
                minHeight: this.props.height || '100%',
                maxHeight: this.props.height || '100%',
            },
        };
        if (this.props.type === 'column' && this.props.fullScreen) {
            window.addEventListener('resize', () => { this.updateComponentMaxHeight(); });
        }
    }

    componentDidMount() {
        var childs = ReactDOM.findDOMNode(this).childNodes;
        var e: any = childs[childs.length - 1];
        if (e !== undefined) {
            e.style.flex = '1 1 auto';
        }
        if (this.props.fullScreen) {
            this.updateComponentMaxHeight();
        }
    }

    updateComponentMaxHeight() {
        var h = window.innerHeight;
        var w = window.innerWidth;
        var top = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
        var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
        let element: any = ReactDOM.findDOMNode(this);
        element.style.maxWidth = w - left;
        element.style.minWidth = w - left;
        element.style.maxHeight = h - top;
        element.style.minHeight = h - top;
    }

    render() {
        const childrenWithProps: any[] = [];
        let index = 0;
        React.Children.forEach(
            this.props.children, (child: any) => {
                // console.log('child: ', child);
                childrenWithProps.push(React.cloneElement(child, {
                    type: this.props.type,
                    key: index
                }));
                index++;
            }
        );
        // console.log(childrenWithProps);
        return (
            <div style={this.state.style}>
                {childrenWithProps}
            </div>
        );
    }
}

interface RowsProps {
    children: Element[];
    style: {
        display: string;
        flexDirection: 'initial' | 'inherit' | 'unset' | 'row' |
        'row-reverse' | 'column' | 'column-reverse' | undefined;
        overflow: 'initial' | 'inherit' | 'unset' | 'auto' | 'hidden'
        | 'scroll' | 'visible' | undefined;
        minHeight: string;
        maxHeight: string;
    };
}

interface RowsState { }

export class Rows extends React.Component<RowsProps, RowsState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Resizable
                type="row"
                fullScreen={true}
            // style={this.props.style} 
            >
                {this.props.children}
            </Resizable>
        );
    }
}

interface ColumnsProps {
    children: JSX.Element[];
    style?: any;
}

interface ColumnsState { }

export class Columns extends React.Component<ColumnsProps, ColumnsState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Resizable
                type="column"
                fullScreen={true}
            // style={this.props.style} 
            >
                {this.props.children}
            </Resizable>
        );
    }

}
