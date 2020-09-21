import {GetCommitDetails} from "../utils/GetCommitDetails";
import {Commit} from "../models/Commit";

export async function GetCommitDate (owner: string, repo: string, pull_number: number) {
    let myCommits: Commit[] = [];

    let commits  = await GetCommitDetails(owner, repo, pull_number);
    const len = commits.length;
    if (len < 1){
        return {myCommits, error: "no commits found"};
    }

    commits.forEach( c => {
        myCommits.push(new Commit(c.sha, c.commit.committer.date));
    });


    return (myCommits);
}
