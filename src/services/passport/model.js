import store from './database';

const getUniqueData = (table, prop, value) =>

    Promise.resolve(store[table].find(x => x[prop] === value));

export const getUserById = _user =>

    getUniqueData('users', 'id', _user);

export const getCredentialsByEmail = email =>

    getUniqueData('credentials', 'email', email);

export const getCredentialsById = id =>

    getUniqueData('credentials', 'id', id);
