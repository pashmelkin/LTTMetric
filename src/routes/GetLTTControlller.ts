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

        let prs = await GetPullRequestNumber("pashmelkin", "vegetableApp", "FixUnitTests2");
        if(prs.length > 1) {
            console.log("more then one PR is found: ", prs.length);
            prs.forEach(pr => {
                console.log(pr);
            });
            response.send("Error, contact customer service.");
        }


        response.send(`Hello, your PR is ${prs[0].id}`);
    }

}

export default GetLTTControlller;
