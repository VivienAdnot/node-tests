import { getUserById, getCompanyById } from './model';

const getUserOrCompanyFromCredentials = (req, res, next) => {

    if (req.credentials._user !== undefined) {

        return getUserById(req.credentials._user)
            .then((user) => {

                req.user = user;
                delete req.credentials;
                next();
                return Promise.resolve();

            });

    }

    if (req.credentials._company !== undefined) {

        return getCompanyById(req.credentials._company)
            .then((company) => {

                req.company = company;
                delete req.credentials;
                next();
                return Promise.resolve();

            });

    }

    throw new Error(`credentials have invalid user: ${req.credentials.id}`);

};

export default getUserOrCompanyFromCredentials;
