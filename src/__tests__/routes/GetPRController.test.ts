import GetPRController from "../../routes/GetPRController";
import * as middleware  from "../../middleware/Middleware";
import { Request, Response } from 'express';
import {PullRequest} from "../../models/PullRequest";
import {Commit} from "../../models/Commit";
import {PRequestsResponse} from "../../models/PRequestsResponse";

describe('GetPRController', function() {
    it('get returns error if underlying function returns error ', async function () {

        const mReq = {} as Request;
        const mRes = {} as Response;
        mRes.header = jest.fn();
        mRes.send = jest.fn();

        const myPulls: PullRequest[] = [];
        const error: string = "some error";

        const resp = {myPulls, error};
        middleware.default.GetPullRequests = jest.fn ().mockReturnValueOnce (resp);


        let sut = new GetPRController();
        await sut.get(mReq, mRes);

        expect(mRes.send).toHaveBeenCalledTimes(1);
        expect(mRes.send).toHaveBeenCalledWith(error);
    });
    it('get returns the list of PRs if underlying function returns the list ', async function () {

        const mReq = {} as Request;
        const mRes = {} as Response;
        mRes.header = jest.fn();
        mRes.send = jest.fn();

        const myPulls: PullRequest[] = [{
            id : 122,
            title : "title",
            merge_commit_sha : "commit sha",
            merged_at : new Date(),
            branch : "branch"
    }];
        const error: string = "";
        const resp = {myPulls, error};

        middleware.default.GetPullRequests = jest.fn ().mockReturnValueOnce (resp);

        let myCommits: Commit[] = [{
            sha: "sha",
            date: new Date()
        }];
        middleware.default.GetCommitDate = jest.fn ().mockReturnValueOnce (myCommits);


        let sut = new GetPRController();
        await sut.get(mReq, mRes);

        const expected = [new PRequestsResponse(myPulls[0].title, myCommits, myPulls[0].merge_commit_sha)];

        expect(mRes.send).toHaveBeenCalledTimes(1);
        expect(mRes.send).toHaveBeenCalledWith(expected);
    });
});
