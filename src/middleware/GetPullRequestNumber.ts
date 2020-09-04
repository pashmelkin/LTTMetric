import {GetPullRequestsAsync }  from "../utils/GetPullRequests" ;
import {PullRequest} from "../models/PullRequest";

export async function GetPullRequestNumber(owner: string, repo: string, cardId: string) {
    let myPulls: PullRequest[] = [];
    let error: string = "";

    let prs = await GetPullRequestsAsync(owner, repo, "closed");
    prs.data.forEach(pr => {

        if (pr.base.ref === "master" && pr.head.ref.toLowerCase().startsWith(cardId.toLowerCase() )) {
            myPulls.push(new PullRequest(pr.number, pr.head.ref, pr.merge_commit_sha));
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
