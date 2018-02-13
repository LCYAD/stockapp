class UserService {
    constructor(knex, uuid) {
        this.knex = knex;
        this.uuid = uuid;
    }

    getUser(type = "", userEmail = "", userID = "") {
        if (type === "") {
            return this.knex.select('*').from('users').where({
                id: userID
            }).limit(1);
        } else {
            return this.knex.select('*').from('users').where({
                type: type,
                email: userEmail
            }).limit(1);
        }
    }

    createUser(type, email, password = "") {
        return this.knex.insert({
            id: this.uuid(),
            email: email,
            password: password,
            type: type,
            panel_setting: JSON.stringify({
                1: 'none',
                2: 'none',
                3: 'none'
            }),
            user_setting: JSON.stringify({currency: '', balance: '', leverage: '', beta_low: '', beta_high: ''}),
            watchlist: JSON.stringify({name: 'watchlist1', instru: []}),
            igtoken: '',
            oandatoken: '',
        }).into('users').returning('id');
    }

    getPanelSetting(userID) {
        return this.knex.select('panel_setting').from('users').where({
            id: userID
        }).limit(1);
    }

    updatePanelSetting(userID, new_panel_setting) {
        return this.knex('users').where({
            id: userID
        }).limit(1).update('panel_setting', JSON.stringify(new_panel_setting), ['panel_setting']);
    }

    updateUserSetting(userID, new_user_setting) {
        return this.knex('users').where({
            id: userID
        }).limit(1).update('user_setting', new_user_setting, ['user_setting']);
    }

    updateWatchList(userID, updated_watchlist) {
        console.log('updating watchlist');
        return this.knex('users').where({
            id: userID
        }).limit(1).update('watchlist', updated_watchlist, ['watchlist']);
    }
}

module.exports = UserService;