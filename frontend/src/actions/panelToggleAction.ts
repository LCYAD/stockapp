export function hideLeftPanel() {
    return {
        type: 'HIDE_LEFT_PANEL',
        payload: false
    };
}

export function hideRightPanel() {
    return {
        type: 'HIDE_RIGHT_PANEL',
        payload: false
    };
}

export function showLeftPanel() {
    return {
        type: 'SHOW_LEFT_PANEL',
        payload: true
    };
}

export function showRightPanel() {
    return {
        type: 'SHOW_RIGHT_PANEL',
        payload: true
    };
}

export function loadLeftPanelType(type: string) {
    return {
        type: 'LOAD_LEFT_PANEL_TYPE',
        payload: type
    };
}

export function loadLeftPanelClass(classType: string)  {
    return {
        type: 'LOAD_LEFT_PANEL_CLASS',
        payload: classType
    };
}

export function changeCenterDimmed(dimmed: boolean)  {
    return {
        type: 'CHANGE_DIMMED',
        payload: dimmed
    };
}

export function changeMainLoad(load: boolean)  {
    return {
        type: 'CHANGE_MAIN_LOAD',
        payload: load
    };
}

export function changeTAccountPane(panel: string, load: boolean) {
    return {
        type: `CHANGE_TACCOUNTPANE${panel}`,
        payload: load
    };
}

export function changeTPositionPane(panel: string, load: boolean) {
    return {
        type: `CHANGE_TPOSITIONPANE${panel}`,
        payload: load
    };
}