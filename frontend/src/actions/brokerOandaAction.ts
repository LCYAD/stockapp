export function getAccounts (input: Object[]) {
    return {
        type: 'GET_ACCOUNTS',
        payload: input
    }
}