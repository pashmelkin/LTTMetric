

export class PullRequest {
    id: number;
    title: string;
    merged_at: string;
    branch: string;
    merge_commit_sha: string;

    constructor(id: number, title: string, merged_at: string, branch: string, sha: string) {
        this.id = id;
        this.title = title;
        this.merged_at = merged_at;
        this.branch = branch;
        this.merge_commit_sha = sha;
    }
}
