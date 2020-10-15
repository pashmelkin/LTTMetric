import * as express from 'express';
import {GetPullRequests} from "../middleware/GetPullRequests";
import * as  PRService  from "../middleware/GetPullRequests";
import {Config} from "../models/iConfig";
import {GetCommitDate} from "../middleware/GetCommitDate";
import {PRequestsResponse} from "../models/PRequestsResponse";

class GetPRController {
    public path = '/GetPR';
    public router = express.Router();
    public config: Config = require('../config.json');

    constructor() {
        this.router.get(this.path, this.get);
    }

    get = async (request: express.Request, response: express.Response) => {

        let result: PRequestsResponse[] = [];
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let {myPulls, error} = await PRService.GetPullRequests(this.config.owner, "sme-web");

        console.log("error", error);
        if(error != "") {
            response.send(error);
            return;
        }

        for (const pr of myPulls) {
            const dates = await GetCommitDate ( this.config.owner , "sme-web" , pr.id );
            result.push ( new PRequestsResponse ( pr.title, dates , pr.merge_commit_sha ) );
        }


        response.send(result);

    }
}

export default GetPRController;
