import {IMiddleware} from '../models/interfaces/IMiddleware';
import {GetPullRequests} from './GetPullRequests';
import {GetCommitDate} from "./GetCommitDate";


const middleware: IMiddleware = {
    GetPullRequests: GetPullRequests,
    GetCommitDate: GetCommitDate
};

export default middleware;
