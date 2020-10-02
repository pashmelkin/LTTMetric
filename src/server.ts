import App from './app'
import GetLTTControlller from './routes/GetLTTControlller';
import {Config} from "./models/iConfig";
import GetPRControlller from "./routes/GetPRControlller";

let config: Config = require('./config.json');

const app = new App(
    [
        new GetLTTControlller(),
        new GetPRControlller(),
    ],
    config.port,
);

app.listen();
