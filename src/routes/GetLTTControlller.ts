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
        const branch = (request.query.branch  ?? "NZPR-1116-setHolidayPay") as string;


        let {myPulls, error} = await GetPullRequestNumber(config.owner, "sme-web", branch);

        if(error != "") {
            response.send(error);
        }

        prID = myPulls[0].id;
        let mergeCommitId = myPulls[0].merge_commit_sha;

        let timeDiff  = await GetDateDifference(config.owner, "sme-web", prID);
        response.send({"time" : timeDiff, "commit": mergeCommitId});

    }

}

export default GetLTTControlller;
