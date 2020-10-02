import {Commit} from "./Commit";

export class PRequestsResponse  {
    title: string;
    commits: Commit[];
    mergeCommitId: string;

    constructor(title: string, commits: Commit[], mergeCommitId: string) {
        this.title = title;
        this.commits = commits;
        this.mergeCommitId = mergeCommitId;
    }
}
