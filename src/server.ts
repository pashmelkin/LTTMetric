import App from './app'
import GetLTTControlller from './routes/GetLTTControlller';

const app = new App(
    [
        new GetLTTControlller(),
    ],
    5000,
);

app.listen();
