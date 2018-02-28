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

function mountRoutes(app, routes) {
    for (let routesByConcept of routes) {
        for (let routeDefinition of routesByConcept) {
            const method = routeDefinition.method === 'DEL'
                ? 'delete'
                : routeDefinition.method.toLowerCase();

            app[method](routeDefinition.path, ...routeDefinition.handlers);
        }
    }
}

module.exports = { run };