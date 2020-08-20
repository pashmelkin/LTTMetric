import * as express from 'express';
import {Commit} from "../models/Commit";
import {GetPullRequestNumber} from "../middleware/GetPullRequestNumber";

class GetLTTControlller {
    public path = '/GetLTT';
    public router = express.Router();

    constructor() {
        this.router.get(this.path, this.get);
    }

    get = async (request: express.Request, response: express.Response) => {
        let myCommits: Commit[];
        let prID: number;

        //let prs = await GetPullRequestNumber("pashmelkin", "vegetableApp", "FixUnitTests2");
        let prs = await GetPullRequestNumber("MYOB-Technology", "payday", "leo-223-serialize-javascript");
        if(prs.error != "") {
            response.send(prs.error);
        }
        prID = prs.myPulls[0].id;

        response.send(`Hello, your PR is ${prID}`);
    }

}

export default GetLTTControlller;
