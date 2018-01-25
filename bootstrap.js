var routes = require('./visit.routes');

function run(app) {
    mountRoutes(app);
}

function mountRoutes(app) {
    reduceAPIRoutes(app, [routes]);
}

function getUserId() {
    setTimeout(() => {
        return Promise.resolve(1234);
    }, 2000);
}

function reduceAPIRoutes(app, routesContainer) {
    for (let routeObj of routesContainer) {
        //console.log(routeObj.routes);
        for (let route of routeObj.routes) {
            //console.log(route.method, route.path, route.handlers);
            //app[route.method](route.path, ...route.handlers);
        }
    }

    app['get']('/api/test', function(req, res, next) {

        getUserId().then(userId => {
            res.locals.userId = userId;
            next();
        });

    }, function(req, res, next) {
        res.send({
            id: req.res.locals.userId,
            test: "ok"
        });
    });
}

module.exports = { run };