import database from "../config/db.js";

export class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

     static async findOne(email) {
        const { data, error } = await database.from('users').select('id, password_hash').eq('email', email);
        if (error) throw error;
        return data.length > 0 ? data[0] : null;
    }
}