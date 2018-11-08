import express from 'express';
import bodyParser from 'body-parser';
import raven from 'raven';
import { run } from './bootstrap';
import { errorResponseSender } from './services/responseSender';
import debug from 'debug';

debug('booting');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sentryUrl = 'https://b722fedddaa648aaaa4146df487e02d0@sentry.io/1200283';
raven
    .config(sentryUrl, {
        captureUnhandledRejections: true
    })
    .install();

app.use(raven.requestHandler());

app.get('/', (req, res) => res.send({ serverLive: true }));

run(app);

raven.setContext({
    tags: {
        errorType: 'uncaught'
    }
});
app.use(raven.errorHandler());

app.use(errorResponseSender);

app.listen(8088);
console.log('server listening on 8088');
