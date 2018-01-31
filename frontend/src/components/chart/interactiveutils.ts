var { isNotDefined, isDefined } = require("react-stockcharts/lib/utils");


export function saveInteractiveNode(this: any, chartId: any) {
	return (node:any) => {
		this[`node_${chartId}`] = node;
	};
}

export function handleSelection(this: any, type: any, chartId: any) {
	return (selectionArray: any) => {
		const key = `${type}_${chartId}`;
		const interactive = this.state[key].map((each:any, idx:any) => {
			return {
				...each,
				selected: selectionArray[idx]
			};
		});
		this.setState({
			[key]: interactive
		});
	};
}

export function saveInteractiveNodes(this: any, type: string, chartId: number) {
	return (node:any) => {
		if (isNotDefined(this.interactiveNodes)) {
			this.interactiveNodes = {};
		}
		const key = `${type}_${chartId}`;
		if (isDefined(node) || isDefined(this.interactiveNodes[key])) {
			// console.error(node, key)
			// console.log(this.interactiveNodes)
			// eslint-disable-next-line fp/no-mutation
			this.interactiveNodes = {
				...this.interactiveNodes,
				[key]: { type, chartId, node },
			};
		}
	};
}

export function getInteractiveNodes(this: any) {
	return this.interactiveNodes;
}