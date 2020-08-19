import {GetPullRequestsAsync }  from "../utils/GetPullRequests" ;
import {PullRequest} from "../models/PullRequest";

export async function GetPullRequestNumber(owner: string, repo: string, branch: string) {
    let myPulls: PullRequest[] = [];
    let prs = await GetPullRequestsAsync(owner, repo, "closed");
    prs.data.forEach(pr => {
        if (pr.base.ref === "master" && pr.head.ref === branch) {
            myPulls.push(new PullRequest(pr.number, pr.head.ref));
        }
    });
    console.log(myPulls);
    return myPulls;
}
