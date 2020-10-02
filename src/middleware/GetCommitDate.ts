import {GetCommitDetails} from "../utils/GetCommitDetails";
import {Commit} from "../models/Commit";

export async function GetCommitDate (owner: string, repo: string, pull_number: number) {
    let myCommits: Commit[] = [];

    const commits  = await GetCommitDetails(owner, repo, pull_number);

    commits.forEach( c => {
        myCommits.push(new Commit(c.sha, c.commit.committer.date));
    });


    return (myCommits);
}
