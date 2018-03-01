var ajvSchemaRoutes = require('./AjvSchema/index.routes');
var asyncLibRoutes = require('./AsyncLib/index.routes');
var fileSystemRoutes = require('./FileSystem/index.routes');
var promisesRoutes = require('./Promises/index.routes');

function run(app) {
    mountRoutes(app, [
        ajvSchemaRoutes,
        asyncLibRoutes,
        fileSystemRoutes,
        promisesRoutes
    ]);
}

function validateRouteHandlers(route) {

    for(let index = 0; index < route.handlers.length; index++) {

        let currentHandler = route.handlers[index];
        if (typeof currentHandler !== 'function') {

            throw new Error(`On ${route.path}, handler ${index} must be a function`);

        }

    }

}

function mountRoutes(app, routesTree) {

    routesTree.forEach((routesContext) => {

        routesContext.forEach((route) => {

            const method = (route.method === 'DEL')
                ? 'delete'
                : route.method.toLowerCase();

            validateRouteHandlers(route);

            app[method](route.path, ...route.handlers);

        })

    });

}

module.exports = { run };