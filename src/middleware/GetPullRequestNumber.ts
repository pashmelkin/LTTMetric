import {GetPullRequestsAsync }  from "../utils/GetPullRequests" ;
import {PullRequest} from "../models/PullRequest";

export async function GetPullRequestNumber(owner: string, repo: string, cardId: string) {
    let myPulls: PullRequest[] = [];
    let error: string = "";

    let prs = await GetPullRequestsAsync(owner, repo, "closed");

    prs.data.forEach(pr => {
        if (pr.base.ref === "master" && pr.head.ref.toLowerCase().includes(cardId.toLowerCase() )) {
            myPulls.push(new PullRequest(pr.number, pr.head.ref, pr.merge_commit_sha));
        }
    });
    if(myPulls.length > 1) {
        console.log("more then one PR is found: ", myPulls.length);
        myPulls.forEach(pr => {
            console.log(pr);
        });
        error = "Error, more then one PR is found.";
    } else if (myPulls.length == 0) {
        error = "Error, no Pull request found for " + cardId;
        console.log(error);
    }
    return {myPulls, error} ;
}
