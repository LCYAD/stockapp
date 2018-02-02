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