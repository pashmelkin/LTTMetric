export class Commit  {
    sha: string;
    date: Date;

    constructor(sha: string, date: Date) {
        this.sha = sha;
        this.date = date;
    }
};
