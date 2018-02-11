import * as React from "react";
var PropTypes = require("prop-types");

var { format } = require("d3-format");
var { timeFormat } = require("d3-time-format");

var { ChartCanvas, Chart } = require("react-stockcharts");
var { CandlestickSeries } = require("react-stockcharts/lib/series");
var { XAxis, YAxis } = require("react-stockcharts/lib/axes");
var {
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateY,
	MouseCoordinateX
} = require("react-stockcharts/lib/coordinates");

var { discontinuousTimeScaleProvider } = require("react-stockcharts/lib/scale");
var { OHLCTooltip } = require("react-stockcharts/lib/tooltip");
var { fitWidth, SaveChartAsImage } = require("react-stockcharts/lib/helper");
var { /*StandardDeviationChannel,*/ EquidistantChannel, TrendLine, FibonacciRetracement, DrawingObjectSelector, InteractiveText } = require("react-stockcharts/lib/interactive");
var { /*last,*/ toObject } = require("react-stockcharts/lib/utils");

import {
	saveInteractiveNodes,
	getInteractiveNodes,
} from "./interactiveutils";
import { Menu, Modal, Button, /*FormGroup,*/ Form, TextArea } from "semantic-ui-react";

class Dialog extends React.Component {
    state: any;
    props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			text: props.text,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	componentWillReceiveProps(nextProps: any) {
		this.setState({
			text: nextProps.text,
		});
	}
	handleChange(e:any) {
		this.setState({
			text: e.target.value
		});
	}
	handleSave() {
		this.props.onSave(this.state.text, this.props.chartId);
	}
	render() {
		const {
			showModal,
			onClose,
		} = this.props;
		const { text } = this.state;

		return (
			<Modal show={showModal} onHide={onClose} >
				<Modal.Header closeButton>
					<b>Edit text</b>
				</Modal.Header>

				<Modal.Content>
					<form>
						<Form.Group controlId="text">
							<Form.Field control={TextArea} type="text" value={text} onChange={this.handleChange} />
						</Form.Group>
					</form>
				</Modal.Content>

				<Modal.Actions>
					<Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
				</Modal.Actions>
            </Modal>

            // <Modal show={showModal} onHide={onClose} >
			// 	<Modal.Header closeButton>
			// 		<Modal.Title>Edit text</Modal.Title>
			// 	</Modal.Header>

			// 	<Modal.Body>
			// 		<form>
			// 			<FormGroup controlId="text">
			// 				<ControlLabel>Text</ControlLabel>
			// 				<FormControl type="text" value={text} onChange={this.handleChange} />
			// 			</FormGroup>
			// 		</form>
			// 	</Modal.Body>

			// 	<Modal.Footer>
			// 		<Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
			// 	</Modal.Footer>
            // </Modal>
		);
	}
}

class CandleStickChartWithStandardDeviationChannel extends React.Component {
    channels_1: any;
    canvasNode: any;
    saveInteractiveNodes: any;
    getInteractiveNodes: any;
    node: any;
    static defaultProps: { type: string; };
    static propTypes: { data: any; width: any; ratio: any; type: any; };

    state: any;
	props: any;
    
	constructor(props: any) {
		super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        
		this.onFibComplete1 = this.onFibComplete1.bind(this);
		//this.onFibComplete3 = this.onFibComplete3.bind(this);
		this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
		//this.onDrawCompleteChart3 = this.onDrawCompleteChart3.bind(this);

		this.onDrawComplete = this.onDrawComplete.bind(this);
		this.saveInteractiveNode = this.saveInteractiveNode.bind(this);
		this.saveCanvasNode = this.saveCanvasNode.bind(this);

		this.handleSelection = this.handleSelection.bind(this);

		this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
        this.getInteractiveNodes = getInteractiveNodes.bind(this);
        this.fib = this.fib.bind(this);
        this.text = this.text.bind(this);
		this.trend = this.trend.bind(this);
		this.channel = this.channel.bind(this);


        this.handleChoosePosition = this.handleChoosePosition.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		// this.state = {
		// 	enableInteractiveObject: true,
		// 	channels_1: []
        // };
        this.onTextComplete = this.onTextComplete.bind(this);

        this.state = {
			enableTrendLine: false,
			trends_1: [
				//{ start: [1606, 56], end: [1711, 53], appearance: { stroke: "green" }, type: "XLINE" }
			],
            //trends_3: [],
            textList_1: [],
			enableFib: false,
			retracements_1: [],
			//retracements_3: [],
			enableInteractiveObject: false,
			channels_1: [],
            //channels_3: []
            enableText: false,
            showModal: false
		};
    }
    
    // handleSelection(interactives:any, moreProps:any, e:any) {
	// 	if (this.state.enableInteractiveObject) {
	// 		const independentCharts = moreProps.currentCharts.filter((d:any) => d !== 2)
	// 		if (independentCharts.length > 0) {
	// 			const first = head(independentCharts);

	// 			const morePropsForChart = getMorePropsForChart(moreProps, first)
	// 			const {
	// 				mouseXY: [, mouseY],
	// 				chartConfig: { yScale },
	// 				xAccessor,
	// 				currentItem,
	// 			} = morePropsForChart;

	// 			const position = [xAccessor(currentItem), yScale.invert(mouseY)];
	// 			const newText = {
	// 				...InteractiveText.defaultProps.defaultText,
	// 				position,
	// 			};
	// 			this.handleChoosePosition(newText, morePropsForChart, e);
	// 		}
	// 	} else {
	// 		const state = toObject(interactives, (each:any) => {
	// 			return [
	// 				`textList_${each.chartId}`,
	// 				each.objects,
	// 			];
	// 		});
	// 		this.setState(state);
	// 	}
    // }
    
	handleChoosePosition(text:any, moreProps:any) {
		this.componentWillUnmount();
		const { id: chartId } = moreProps.chartConfig;

		this.setState({
			[`textList_${chartId}`]: [
				...this.state[`textList_${chartId}`],
				text
			],
			showModal: true,
			text: text.text,
			chartId
		});
    }
    
	handleTextChange(text:any, chartId:any) {
        var last:any;
		const textList = this.state[`textList_${chartId}`];
		const allButLast = textList
			.slice(0, textList.length - 1);

		const lastText = {
			...last(textList),
			text,
		};

		this.setState({
			[`textList_${chartId}`]: [
				...allButLast,
				lastText
			],
			showModal: false,
			enableText: false,
		});
		this.componentDidMount();
    }
    
	handleDialogClose() {
		this.setState({
			showModal: false,
		});
		this.componentDidMount();
    }
    

	saveInteractiveNode(node: any) {
		this.node = node;
	}
	saveCanvasNode(node: any) {
		this.canvasNode = node;
	}
	componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
	handleSelection(interactives: any) {
		const state = toObject(interactives, (each:any) => {
			return [
				`channels_${each.chartId}`,
				each.objects,
			];
		});
		this.setState(state);
	}
	onDrawComplete(channels_1:any) {
		// this gets called on
		// 1. draw complete of drawing object
		// 2. drag complete of drawing object
		this.setState({
			enableInteractiveObject: false,
			channels_1
		});
    }

	onFibComplete1(retracements_1: any) {
		this.setState({
			retracements_1,
			enableFib: false
		});
	}

	// onFibComplete3(retracements_3: any) {
	// 	this.setState({
	// 		retracements_3,
	// 		enableFib: false
	// 	});
	// }

	onDrawCompleteChart1(trends_1: any) {
		// this gets called on
		// 1. draw complete of trendline
		// 2. drag complete of trendline
		//console.log(trends_1);
		this.setState({
			trends_1,
			enableTrendLine: false
		});
	}
    
    text() {
		console.log(this.state);
		this.setState({
            enableText: true,
            showModal : true
		});
    }
    
    channel() {
		console.log(this.state);
		this.setState({
			enableInteractiveObject: true
		});
	}

	fib() {
		console.log(this.state);
		this.setState({
			enableFib: true
		});
	}

	trend() {
		console.log(this.state);
		this.setState({
			enableTrendLine: true
		});
    }
    
    saveImage() {
		SaveChartAsImage.saveChartAsImage(document);
	}

	hoverOn(className: string) {
		document.getElementsByClassName(className)["0"].style.color="lightBlue";
	}

	hoverOut(className: string) {
		document.getElementsByClassName(className)["0"].style.color="grey";
	}

	svgHoverOn(className: string) {
		for (var x=0; x< document.querySelectorAll('svg.'+className+" path").length; x++) {
			document.querySelectorAll('svg.'+className+" path")[x]['style'].fill="lightBlue";
		}
	}

	svgHoverOut(className: string) {
		for (var x=0; x< document.querySelectorAll('svg.'+className+" path").length; x++) {
			document.querySelectorAll('svg.'+className+" path")[x]['style'].fill="grey";
		}
    }
    
    onTextComplete(textList:any, moreProps:any) {
		// this gets called on
		// 1. draw complete of drawing object
		// 2. drag complete of drawing object
		const { id: chartId } = moreProps.chartConfig;

		this.setState({
			enableInteractiveObject: false,
			[`textList_${chartId}`]: textList,
		});
    }
    
	onKeyPress(e:any) {
		const keyCode = e.which;
		console.log(keyCode);
		switch (keyCode) {
		case 8: {
			// DEL
			const channels_1 = this.state.channels_1
                .filter((each:any) => !each.selected);
                
            const trends_1 = this.state.trends_1
                .filter((each: any) => !each.selected);      
            const retracements_1 = this.state.retracements_1
                .filter((each:any) => !each.selected);
            
            var textList_1 = this.state.textList_1.filter((d:any) => !d.selected);

            this.canvasNode.cancelDrag();
            this.setState({
                trends_1,
                retracements_1,
                channels_1,
                textList_1
            });

			// this.canvasNode.cancelDrag();
			// this.setState({
			// 	channels_1,
			// });
			break;
		}
		case 27: {
			// ESC
			this.node.terminate();
			this.canvasNode.cancelDrag();
			this.setState({
				enableInteractiveObject: false
			});
			break;
		}
		case 68: // D - Draw drawing object
		case 69: {
			// E - Enable drawing object
			this.setState({
				enableInteractiveObject: true
			});
			break;
		}
		}
	}
	render() {
        const { showModal, text } = this.state;
		const { type, data: initialData, width, ratio } = this.props;
		//const { channels_1 } = this.state;

		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
			(d:any) => d.date
		);
		const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
			initialData
		);

		//const start = xAccessor(last(data));
		//const end = xAccessor(data[Math.max(0, data.length - 150)]);
        //const xExtents = [start, end];
        
        var iconStyle = {
			width: 28,
			color: 'grey',}
		var menuStyle = {
			width: '60px',}

		return (
            <div>
            <div>
                <div className="ui grid">
                    <div className="column">
                        <div className="ui tabular">
                        <Menu vertical tabular style = {menuStyle}>
                            <Menu.Item onClick={this.text} onMouseOver={()=>this.svgHoverOn("text")} onMouseOut={()=>this.svgHoverOut("text")} onLoad={()=>this.svgHoverOut("text")}>
                                <svg className="text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M14 5.5v17h1v-17z" id="Line"></path><path d="M9 8.5v-2.001c0-.272.229-.499.502-.499h9.995c.28 0 .502.221.502.499v2.001h1v-2.001c0-.832-.672-1.499-1.502-1.499h-9.995c-.824 0-1.502.673-1.502 1.499v2.001h1z"></path><path d="M12 23h5v-1h-5z"></path></g></svg>
                            </Menu.Item>
                            <Menu.Item onClick={this.channel} onMouseOver={()=>this.svgHoverOn("channel")} onMouseOut={()=>this.svgHoverOut("channel")} onLoad={()=>this.svgHoverOut("channel")}>
                                <svg className="channel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.463 12.026l13.537-7.167-.468-.884-13.537 7.167z"></path><path d="M22.708 16.824l-17.884 9.468.468.884 17.884-9.468z"></path><path d="M22.708 9.824l-15.839 8.386.468.884 15.839-8.386z"></path><path d="M5.5 14c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 21c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM22.5 5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
                            </Menu.Item>
                            <Menu.Item name='pics' onClick={this.trend} onMouseOver={()=>this.svgHoverOn("trend")} onMouseOut={()=>this.svgHoverOut("trend")} onLoad={()=>this.svgHoverOut("trend")}>
                                <svg className="trend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
                            </Menu.Item>
                            <Menu.Item name='companies' onClick={this.fib} onMouseOver={()=>this.svgHoverOn("fib")} onMouseOut={()=>this.svgHoverOut("fib")} onLoad={()=>this.svgHoverOut("fib")}>
                                <svg className="fib" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fillRule="nonzero"> <path d="M3 5h22v-1h-22z"></path><path d="M3 17h22v-1h-22z"></path><path d="M3 11h19.5v-1h-19.5z"></path><path d="M5.5 23h19.5v-1h-19.5z"></path><path d="M3.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM24.5 12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
                            </Menu.Item>
                            <Menu.Item name='links' onClick={this.saveImage}>
                                <i className="fa fa-download fa-2x" aria-hidden="true" style={iconStyle} onClick={this.saveImage} onMouseOver={()=>this.hoverOn("fa-download")} onMouseOut={()=>this.hoverOut("fa-download")}> </i>
                            </Menu.Item>
                        </Menu>
                        </div>
                </div>
                <div className="wide column">

                    <ChartCanvas ref={this.saveCanvasNode}
                        height={500}
                        width={0.95*width}
                        ratio={ratio}
                        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                        type={type}
                        seriesName="MSFT"
                        data={data}
                        xScale={xScale}
                        xAccessor={xAccessor}
                        displayXAccessor={displayXAccessor}
                        //xExtents={xExtents}
                    >
                        <Chart
                            id={1}
                            yExtents={[(d:any) => [d.high, d.low]]}
                            padding={{ top: 10, bottom: 20 }}
                        >

                            <YAxis axisAt="right" orient="right" ticks={5} />
                            <XAxis axisAt="bottom" orient="bottom" />

                            <MouseCoordinateY
                                at="right"
                                orient="right"
                                displayFormat={format(".2f")}
                            />
                            <MouseCoordinateX
                                at="bottom"
                                orient="bottom"
                                displayFormat={timeFormat("%Y-%m-%d")}
                            />
                            <CandlestickSeries />

                            <EdgeIndicator
                                itemType="last"
                                orient="right"
                                edgeAt="right"
                                yAccessor={(d:any) => d.close}
                                fill={(d:any) => (d.close > d.open ? "#6BA583" : "#FF0000")}
                            />

                            <OHLCTooltip origin={[-40, 0]} />

                            {/* <StandardDeviationChannel
                                ref={this.saveInteractiveNodes("StandardDeviationChannel", 1)}
                                enabled={this.state.enableInteractiveObject}
                                onStart={() => console.log("START")}
                                onComplete={this.onDrawComplete}
                                channels={channels_1}
                            /> */}

                            <TrendLine
                                ref={this.saveInteractiveNodes("Trendline", 1)}
                                enabled={this.state.enableTrendLine}
                                type="RAY"
                                snap={false}
                                snapTo={(d: any) => [d.high, d.low]}
                                onStart={() => console.log("START")}
                                onComplete={this.onDrawCompleteChart1}
                                trends={this.state.trends_1}
                            />
                            <FibonacciRetracement
                                ref={this.saveInteractiveNodes("FibonacciRetracement", 1)}
                                enabled={this.state.enableFib}
                                retracements={this.state.retracements_1}
                                onComplete={this.onFibComplete1}
                            />
                            <EquidistantChannel
                                ref={this.saveInteractiveNodes("EquidistantChannel", 1)}
                                enabled={this.state.enableInteractiveObject}
                                onStart={() => console.log("START")}
                                onComplete={this.onDrawComplete}
                                channels={this.state.channels_1}
                            />
                            <InteractiveText
                                ref={this.saveInteractiveNodes("InteractiveText", 1)}
                                enabled={this.state.enableText}
                                text="Lorem ipsum..."
                                onDragComplete={this.onTextComplete}
                                textList={this.state.textList_1}
                            />

                        </Chart>
                        <CrossHairCursor />
                        <DrawingObjectSelector
                            enabled={!this.state.enableInteractiveObject}
                            getInteractiveNodes={this.getInteractiveNodes}
                            drawingObjectMap={{
                                //StandardDeviationChannel: "channels",
                                Trendline: "trends",
                                FibonacciRetracement: "retracements",
                                EquidistantChannel: "channels",
                                InteractiveText: "textList"
                            }}
                            onSelect={this.handleSelection}
                        />
                        <Dialog
                            showModal={showModal}
                            text={text}
                            chartId={this.state.chartId}
                            onClose={this.handleDialogClose}
                            onSave={this.handleTextChange}
                        />
                    </ChartCanvas>
                </div>
				</div>
			</div>
			
		</div>
		);
	}
}

CandleStickChartWithStandardDeviationChannel.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
};

CandleStickChartWithStandardDeviationChannel.defaultProps = {
	type: "svg"
};

var CandleStickChartWithStandardDeviationChannel_Export = fitWidth(
	CandleStickChartWithStandardDeviationChannel
);

export default CandleStickChartWithStandardDeviationChannel_Export;