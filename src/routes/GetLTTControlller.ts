import * as express from 'express';
import {GetPullRequests} from "../middleware/GetPullRequests";
import {Config} from "../models/iConfig";
//import {GetDateDifference} from "../middleware/GetDateDifference";
import {GetCommitDate} from "../middleware/GetCommitDate";

class GetLTTControlller {
    public path = '/GetLTT';
    public router = express.Router();
    public config: Config = require('../config.json');

    constructor() {
        //this.router.get(this.path, this.getTimeDiff);
        this.router.get(this.path, this.get);
    }

    getTimeDiff = async (request: express.Request, response: express.Response) => {

        this.get(request, response);

        //let timeDiff  = await GetDateDifference(this.config.owner, "sme-web", prID);
        //response.send({"time" : timeDiff, "commit": mergeCommitId});
        response.send("Rework is needed");

    };
    get = async (request: express.Request, response: express.Response) => {

        let prID: number;

        const branch = (request.query.branch  ?? "nzpr") as string;


        let {myPulls, error} = await GetPullRequests(this.config.owner, "sme-web", branch);

        if(error != "") {
            response.send(error);
            return;
        }

        prID = myPulls[0].id;
        let mergeCommitId = myPulls[0].merge_commit_sha;
        let dates  = await GetCommitDate(this.config.owner, "sme-web", prID);

        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.send({PRcommits : dates,
                             mergeCommitId : mergeCommitId});

    }

}

export default GetLTTControlller;
