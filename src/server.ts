import App from './app'
import GetLTTControlller from './routes/GetLTTControlller';
import DeploymentControlller from './routes/DeploymentControlller';
import {Config} from "./models/iConfig";

let config: Config = require('./config.json');

const app = new App(
    [
        new GetLTTControlller(),
        new DeploymentControlller()
    ],
    config.port,
);

app.listen();
