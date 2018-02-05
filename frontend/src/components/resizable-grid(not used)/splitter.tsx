import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface SplitterProps {
    type?: string;
    className?: any;
    hideble?: any;
    style?: any;
}

interface SplitterState {
    dragging: boolean;
    resizableElement: any;
    otherElement: any;
    style: any;
    hideble: any;
    hidden: boolean;
    hiddenElemSize: number;
    className: any;
}

export class Splitter extends React.Component<SplitterProps, SplitterState> {
    constructor(props: any) {
        super(props);
        var style: any;
        if (this.props.type === 'column') {
            style = {
                flex: '0 0 auto',
                width: '100%',
                cursor: 'row-resize',
                // background: 'black',
                // height: 18,
            };
        } else { // type != column
            style = {
                flex: '0 0 auto',
                height: '100%',
                cursor: 'col-resize',
                // background: 'black',
                // width: 18,
            };
        }

        var comparedStyle = {
            ...{},
            ...style,
            ...this.props.style,
        };

        // console.log('comparedStyle', comparedStyle);
        var className = (this.props.type === 'row') ? 'vertival-splitter' : 'horisontal-splitter';
        if (this.props.className !== undefined) {
            className += ' ' + this.props.className;
        }
        this.state = {
            dragging: false,
            resizableElement: null,
            otherElement: null,
            style: comparedStyle,
            hideble: this.props.hideble,
            hidden: false,
            hiddenElemSize: 0,
            className: className,
        };
        this.mouseDown = this.mouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

    }

    componentDidUpdate(props: any, state: any) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    }

    mouseDown(e: any) {
        var node = ReactDOM.findDOMNode(this);
        var parent: any = null;
        parent = ReactDOM.findDOMNode(e.currentTarget).parentNode;
        if (parent !== null) {
            parent = parent.childNodes;
        }
        var resizebleElement;
        var otherElement;
        for (var i = 0; i < parent.length; i++) {
            if (parent[i] === node) {
                resizebleElement = parent[i - 1];
                otherElement = parent[i + 1];
                break;
            }
        }
        console.log('old resizeableElement:', resizebleElement.style);
        // console.log('otherElement:', otherElement.clientWidth);

        if (this.props.type === 'row') {
            var maxWidth = resizebleElement.clientWidth + otherElement.clientWidth;
            resizebleElement.style.setProperty('maxWidth', maxWidth);
        } else {
            var maxHeight = resizebleElement.clientHeight + otherElement.clientHeight;
            console.log('Adding New Height', maxHeight);
            resizebleElement.style.setProperty('maxHeight', maxHeight, 'important');
        }
        console.log(resizebleElement.style);
        this.setState({
            dragging: true,
            resizableElement: resizebleElement,
            otherElement: otherElement,
        });

    }

    onMouseUp(e: any) {
        this.setState({
            dragging: false,
        });
        if (this.props.type === 'row') {
            this.state.resizableElement.style.maxWidth = '';
        } else {
            this.state.resizableElement.style.maxHeight = '';
        }
    }

    onMouseMove(e: any) {
        var offset = this.state.resizableElement.getBoundingClientRect();
        if (this.props.type === 'column') {
            var rootElemHeight = ReactDOM.findDOMNode(this).clientHeight;
            console.log(offset.top, e.clientY, rootElemHeight);
            var newHeight = e.clientY - offset.top - rootElemHeight / 2;
            var newOtherHeight = Number(this.state.resizableElement.style.maxHeight) - newHeight;
            console.log(newHeight);
            console.log(newOtherHeight);
            if (newHeight >= 0 && newOtherHeight >= 0) {
                // this.state.resizableElement.style.height = newHeight;
                // this.state.otherElement.style.height = newOtherHeight;
                this.state.resizableElement.style.setProperty('height', newHeight);
                this.state.otherElement.stype.setProperty('height', newOtherHeight);
            }
        } else {
            var rootElemWith: any = ReactDOM.findDOMNode(this).clientWidth;
            var newWidth = e.clientX - offset.left - parseInt(rootElemWith, 10) / 2;
            var newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth, 10) - newWidth;
            if (newOtherWidth >= 0 && newWidth >= 0) {
                // this.state.resizableElement.style.width = newWidth;
                // this.state.otherElement.style.width = newOtherWidth;
                this.state.resizableElement.style.setProperty('width', newWidth);
                this.state.otherElement.stype.setProperty('width', newOtherWidth);
            }
        }
    }

    render() {
        return (
            <div
                className={this.state.className}
                style={this.state.style}
                onMouseDown={this.mouseDown}
                onMouseUp={this.onMouseUp}
            />
        );
    }
}
