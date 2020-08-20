import {GetPullRequestsAsync }  from "../utils/GetPullRequests" ;
import {PullRequest} from "../models/PullRequest";

export async function GetPullRequestNumber(owner: string, repo: string, branch: string) {
    let myPulls: PullRequest[] = [];
    let error: string = "";

    let prs = await GetPullRequestsAsync(owner, repo, "closed");
    prs.data.forEach(pr => {
        if (pr.base.ref === "master" && pr.head.ref === branch) {
            myPulls.push(new PullRequest(pr.number, pr.head.ref));
        }
    });
    if(myPulls.length > 1) {
        console.log("more then one PR is found: ", myPulls.length);
        myPulls.forEach(pr => {
            console.log(pr);
        });
        error = "Error, contact customer service.";
    }
    return {myPulls, error} ;
}
