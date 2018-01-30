class UserService {
    constructor(knex, uuid){
        this.knex = knex;
        this.uuid = uuid;
    }

    getUser(type="", userEmail="", userID=""){
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

    createUser(type, email, password = ""){
        return this.knex.insert({
            id: this.uuid(),
            email: email,
            password: password,
            type: type
        }).into('users').returning('id');
    }
}

module.exports = UserService;