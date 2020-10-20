import {GetPullRequests} from './GetPullRequests';
import {GetCommitDate} from "./GetCommitDate";

interface IMiddleware {
    GetPullRequests: (owner: string, repo: string, branchPattern: string)
        => PromiseLike<{ myPulls: any; error: any; }> | { myPulls: any; error: any; };
    GetCommitDate: (owner: string, repo: string, pull_number: number) => any

};


const middleware: IMiddleware = {
    GetPullRequests: GetPullRequests,
    GetCommitDate: GetCommitDate
};

export default middleware;
