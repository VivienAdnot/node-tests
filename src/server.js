import express from 'express';
import bodyParser from 'body-parser';
import { run } from './bootstrap';
import { errorResponseSender } from './services/responseSender';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send({ serverLive: true }));

run(app);

app.use(errorResponseSender);

app.listen(8088);
console.log('server listening on 8088');
