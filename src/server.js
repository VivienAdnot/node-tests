import express from 'express';
import bodyParser from 'body-parser';
import Raven from 'raven';
import { run } from './bootstrap';
import { errorResponseSender } from './services/responseSender';
import { initFirebase } from './services/firebase';

initFirebase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sentryUrl = 'https://b722fedddaa648aaaa4146df487e02d0@sentry.io/1200283';
Raven
    .config(sentryUrl, {
        captureUnhandledRejections: true
    })
    .install();

app.use(Raven.requestHandler());

app.get('/', (req, res) => res.send({ serverLive: true }));

run(app);

Raven.setContext({
    tags: {
        errorType: 'uncaught'
    }
});
app.use(Raven.errorHandler());

app.use(errorResponseSender);

app.listen(8088);
console.log('server listening on 8088');
