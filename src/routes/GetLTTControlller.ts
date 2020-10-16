import * as express from 'express';
import middleware from "../middleware/middleware";
import {Config} from "../models/interfaces/iConfig";
//import {GetDateDifference} from "../middleware/GetDateDifference";
import {GetCommitDate} from "../middleware/GetCommitDate";
import {PRequestsResponse} from "../models/PRequestsResponse";

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
        let result: PRequestsResponse[] = [];
        let title: string;
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        const branch = (request.query.branch  ?? "nzpr") as string;

        let {myPulls, error} = await middleware.GetPullRequests(this.config.owner, "sme-web", branch);

        if(error != "") {
            response.send(error);
            return;
        }

        prID = myPulls[0].id;
        title = myPulls[0].title;
        let mergeCommitId = myPulls[0].merge_commit_sha;
        let commits  = await GetCommitDate(this.config.owner, "sme-web", prID);
        result.push(new PRequestsResponse(title, commits, mergeCommitId));

        response.send(result);

    }

}

export default GetLTTControlller;
