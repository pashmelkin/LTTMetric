

export class PullRequest {
    id: number;
    branch: string;
    merge_commit_sha: string;

    constructor(id: number, branch: string, sha: string) {
        this.id = id;
        this.branch = branch;
        this.merge_commit_sha = sha;
    }
}
