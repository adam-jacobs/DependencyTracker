import database from "../config/db.js";

const getUser = async (email) => {
    const { data, error } = await database.from('users').select('id, password_hash').eq('email', email);
    if (error) throw error;
    return data.length > 0 ? data[0] : null;
}

export default getUser;