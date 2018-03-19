import store from './database';

export const getUserById = _user =>

    Promise.resolve(store.users.find(x => x.id === _user));

export const getCredentialsByEmail = email =>

    Promise.resolve(store.credentials.find(x => x.email === email));
