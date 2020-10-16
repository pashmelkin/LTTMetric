import * as express from 'express';
import middleware from "../middleware/middleware";
import {Config} from "../models/interfaces/iConfig";
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

        let {myPulls, error} = await middleware.GetPullRequests(this.config.owner, "sme-web", "");

        console.log("error", error);
        if(error != "") {
            response.send(error);
            return;
        }

        for (const pr of myPulls) {
            const dates = await middleware.GetCommitDate ( this.config.owner , "sme-web" , pr.id );
            result.push ( new PRequestsResponse ( pr.title, dates , pr.merge_commit_sha ) );
        }


        response.send(result);

    }
}

export default GetPRController;
