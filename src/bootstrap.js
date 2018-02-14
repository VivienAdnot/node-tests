var anchorRoutes = require('./Anchors/anchors.routes');
var mailIssueRoutes = require('./Mail-issue/mail-issue.routes');

function run(app) {
    mountRoutes(app, [
        anchorRoutes,
        mailIssueRoutes
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