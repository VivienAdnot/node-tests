import passport from 'passport';
import { userLoginStrategy, userHeaderAuthenticateStrategy } from './services/passport/strategy-user';
import { companyLoginStrategy, companyHeaderAuthenticateStrategy } from './services/passport/strategy-company';
import ajvSchemaRoutes from './AjvSchema/index.routes';
import asyncLibRoutes from './AsyncLib/index.routes';
import fileSystemRoutes from './FileSystem/index.routes';
import promisesRoutes from './Promises/index.routes';
import authenticationUserRoutes from './AuthenticationUser/index.routes';
import authenticationCompanyRoutes from './AuthenticationCompany/index.routes';
import headRoutes from './headRoute/index.routes';
import failRoutes from './failRoute/index.routes';

const validateRouteHandlers = (route) => {

    for (let index = 0; index < route.handlers.length; index += 1) {

        const currentHandler = route.handlers[index];
        if (typeof currentHandler !== 'function') {

            throw new Error(`On ${route.path}, handler ${index} must be a function`);

        }

    }

};

const mountRoutes = (app, routesTree) =>

    routesTree.forEach((routesContext) => {

        routesContext.forEach((route) => {

            const method = (route.method === 'DEL')
                ? 'delete'
                : route.method.toLowerCase();

            validateRouteHandlers(route);

            app[method](route.path, ...route.handlers);

        });

    });

const run = (app) => {

    passport.use(userLoginStrategy);
    passport.use(userHeaderAuthenticateStrategy);
    passport.use(companyLoginStrategy);
    passport.use(companyHeaderAuthenticateStrategy);

    mountRoutes(app, [
        ajvSchemaRoutes,
        asyncLibRoutes,
        fileSystemRoutes,
        promisesRoutes,
        authenticationUserRoutes,
        authenticationCompanyRoutes,
        headRoutes,
        failRoutes
    ]);

};

module.exports = { run };
