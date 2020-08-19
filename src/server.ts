import App from './app'
import GetLTTControlller from './routes/GetLTTControlller';
import {Config} from "./models/iConfig";

let config: Config = require('./config.json');

const app = new App(
    [
        new GetLTTControlller(),
    ],
    config.port,
);

app.listen();
