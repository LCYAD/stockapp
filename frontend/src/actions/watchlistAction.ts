export function ActionAddInstru(instru: string) {
    return {
        type: "SELECT_INSTRU",
        payload: instru,
    };
}

export function ActionInstruTrigger(instru: string) {
    return {
        type: "TRIGGER_INSTRU",
        payload: instru,
    };
}

export function updateWatchList(instru: string) {
    return {
        type: "UPDATE_WATCHLIST",
        payload: instru
    }
}