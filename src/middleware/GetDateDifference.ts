import {GetCommitDetails} from "../utils/GetCommitDetails";
import {Commit} from "../models/Commit";
const DateDiff = require('date-diff');

export async function GetDateDifference (owner: string, repo: string, pull_number: number) {
    let error: string = "";
    let myCommits: Commit[] = [];

    let commits  = await GetCommitDetails(owner, repo, pull_number);
    const len = commits.length;
    if (len < 1){
        return {myCommits, error: "no commits found"};
    }

    commits.forEach( c => {
        myCommits.push(new Commit(c.sha, c.commit.committer.date));
    });

    const date1 = new Date(myCommits[0].date);
    const date2 = new Date(myCommits[len-1].date);

    console.log(date1, date2);
    const diff = new DateDiff(date1, date2);
    return {days: Math.abs(diff.days()), error} ;
}
