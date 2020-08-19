import * as express from 'express';
import {PullRequest} from "../models/PullRequest";
import {Commit} from "../models/Commit";
import {GetPullRequestNumber} from "../middleware/GetPullRequestNumber";

class GetLTTControlller {
    public path = '/GetLTT';
    public router = express.Router();

    constructor() {
        this.router.get(this.path, this.get);
    }

    get = async (request: express.Request, response: express.Response) => {
        let myPulls: PullRequest[];
        let myCommits: Commit[];

        let pr = await GetPullRequestNumber("pashmelkin", "vegetableApp", "FixUnitTests2");
        console.log(pr);
        response.send("Hello");
    }

}

export default GetLTTControlller;
