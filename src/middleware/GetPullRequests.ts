import {GetPullRequestsAsync }  from "../utils/GetPullRequests" ;
import {PullRequest} from "../models/PullRequest";


export async function GetPullRequests(owner: string, repo: string, branchPattern = "")  {
    let myPulls: PullRequest[] = [];
    let error: string = "";

    console.log("++++++++++++++++++++=real function");

    let prs = await GetPullRequestsAsync(owner, repo, "closed", 10);

    prs.data.forEach(pr => {
        if (pr.base.ref === "master" && pr.head.ref.toLowerCase().includes(branchPattern.toLowerCase() )) {
            myPulls.push(new PullRequest(pr.number, pr.title, pr.merged_at, pr.head.ref, pr.merge_commit_sha));
        }
    });

     if (myPulls.length == 0) {
        error = "Error, no Pull request found for " + branchPattern;
        console.log(error);
    }

    return {myPulls, error} ;
}
