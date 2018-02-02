import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface SplitterProps {
    type: string;
    className: any;
    hideble: any;
    style: any;
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
    constructor(props:any) {
        super(props);
        var style:any;
        if (this.props.type == 'column') {
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

        //console.log('comparedStyle', comparedStyle);
        var className = (this.props.type == 'row') ? "vertival-splitter" : "horisontal-splitter";
        if (this.props.className != undefined) className += " " + this.props.className;
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
        var parent : any = null;
        parent = ReactDOM.findDOMNode(e.currentTarget).parentNode;
        if (parent !== null) {
            parent = parent.childNodes;
        }
        var resizebleElement;
        var otherElement;
        for (var i = 0; i < parent.length; i++) {
            if (parent[i] == node) {
                resizebleElement = parent[i - 1];
                otherElement = parent[i + 1];
                break;
            }
        }

        if (this.props.type == 'row') {
            var maxWidth = resizebleElement.clientWidth + otherElement.clientWidth;
            resizebleElement.style.maxWidth = maxWidth;
        } else {
            var maxHeight = resizebleElement.clientHeight + otherElement.clientHeight;
            resizebleElement.style.maxHeight = maxHeight;
        }

        this.setState({
            dragging: true,
            resizableElement: resizebleElement,
            otherElement: otherElement,
        });
    }

    onMouseUp(e:any) {
        this.setState({
            dragging: false,
        });
        if (this.props.type == 'row') {
            this.state.resizableElement.style.maxWidth = '';
        } else {
            this.state.resizableElement.style.maxHeight = '';
        }
    }

    onMouseMove(e: any) {

        var offset = this.state.resizableElement.getBoundingClientRect();
        if (this.props.type == 'column') {
            var rootElemHeight = ReactDOM.findDOMNode(this).clientHeight;
            var newHeight = e.clientY - offset.top - rootElemHeight / 2;
            var newOtherHeight = parseInt(this.state.resizableElement.style.maxHeight) - newHeight;
            if (newHeight >= 0 && newOtherHeight >= 0) {
                this.state.resizableElement.style.height = newHeight;
                this.state.otherElement.style.height = newOtherHeight;
            }
        } else {
            var rootElemWith: any = ReactDOM.findDOMNode(this).clientWidth;
            var newWidth = e.clientX - offset.left - parseInt(rootElemWith) / 2;
            var newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth) - newWidth;
            if (newOtherWidth >= 0 && newWidth >= 0) {
                this.state.resizableElement.style.width = newWidth;
                this.state.otherElement.style.width = newOtherWidth;
            }
        }
    }

    render() {
        return (
            <div className={this.state.className} style={this.state.style} onMouseDown={this.mouseDown} onMouseUp={this.onMouseUp} />
        );
    }
}
