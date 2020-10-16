import App from './app'
import GetLTTControlller from './routes/GetLTTControlller';
import {Config} from "./models/interfaces/iConfig";
import GetPRController from "./routes/GetPRController";

let config: Config = require('./config.json');

const app = new App(
    [
        new GetLTTControlller(),
        new GetPRController(),
    ],
    config.port,
);

app.listen();
