import passport from 'passport';
import { loginStrategy, headerAuthenticateStrategy } from './services/passport/strategy';
import ajvSchemaRoutes from './AjvSchema/index.routes';
import asyncLibRoutes from './AsyncLib/index.routes';
import fileSystemRoutes from './FileSystem/index.routes';
import promisesRoutes from './Promises/index.routes';
import authenticationRoutes from './Authentication/index.routes';
import protectedRoutes from './Authentication/protected.routes';

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

    passport.use(loginStrategy);
    passport.use(headerAuthenticateStrategy);

    mountRoutes(app, [
        ajvSchemaRoutes,
        asyncLibRoutes,
        fileSystemRoutes,
        promisesRoutes,
        authenticationRoutes,
        protectedRoutes
    ]);

};

module.exports = { run };
