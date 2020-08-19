

export class PullRequest {
    id: number;
    branch: string;

    constructor(id: number, branch: string) {
        this.id = id;
        this.branch = branch;
    }
}
