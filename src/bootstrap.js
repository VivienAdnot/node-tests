import passport from 'passport';
import { userLoginStrategy, userHeaderAuthenticateStrategy } from './services/passport/strategy-user';
import ajvSchemaRoutes from './AjvSchema/index.routes';
import asyncLibRoutes from './AsyncLib/index.routes';
import fileSystemRoutes from './FileSystem/index.routes';
import promisesRoutes from './Promises/index.routes';
import authenticationUserRoutes from './AuthenticationUser/index.routes';
import headRoutes from './headRoute/index.routes';
import firebaseRoutes from './Firebase/index.routes';
import sentryRoutes from './Sentry/index.routes';
import sendgridRoutes from './Sendgrid/index.routes';
import passwordRoutes from './Passwords/index.routes';
import emailRoutes from './Email/index.routes';
import childProcessRoutes from './ChildProcess/index.routes';

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

    mountRoutes(app, [
        emailRoutes,
        ajvSchemaRoutes,
        asyncLibRoutes,
        fileSystemRoutes,
        promisesRoutes,
        authenticationUserRoutes,
        headRoutes,
        firebaseRoutes,
        sentryRoutes,
        sendgridRoutes,
        passwordRoutes,
        childProcessRoutes
    ]);

};

module.exports = { run };
