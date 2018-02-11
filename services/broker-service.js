class BrokerService {
    constructor(knex) {
        this.knex = knex;
    }

    changeToken(broker, token, userid) {
        if (broker === 'oandatoken'){
            return this.knex('users')
            .where({
                id: userid
            }).limit(1).update({
                oandatoken: token
            }).returning('oandatoken');
        } else {
            return this.knex('users')
            .where({
                id: userid
            }).limit(1).update({
                igtoken: token
            }).returning('igtoken');
        }
        
    }
}

module.exports = BrokerService;