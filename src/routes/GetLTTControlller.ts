import * as express from 'express';
import {GetPullRequestNumber} from "../middleware/GetPullRequestNumber";
import {Config} from "../models/iConfig";
import {GetDateDifference} from "../middleware/GetDateDifference";

class GetLTTControlller {
    public path = '/GetLTT';
    public router = express.Router();

    constructor() {
        this.router.get(this.path, this.get);
    }

    get = async (request: express.Request, response: express.Response) => {

        let prID: number;
        let config: Config = require('../config.json');

        //let prs = await GetPullRequestNumber("pashmelkin", "vegetableApp", "FixUnitTests2");
        let {myPulls, error} = await GetPullRequestNumber(config.owner, "payday", "leo-223-serialize-javascript");
        if(error != "") {
            response.send(error);
        }
        prID = myPulls[0].id;
        let timeDiff  = await GetDateDifference(config.owner, "payday", prID);
        response.send(timeDiff);

    }

}

export default GetLTTControlller;
