import GetPRController from "../../routes/GetPRController";
import * as middleware  from "../../middleware/middleware";
import { Request, Response } from 'express';

describe('GetPRController', function() {
    it('get', async function(done) {


        const mReq = {} as Request;
        const mRes = {} as Response;
        mRes.header = jest.fn();
        mRes.send = jest.fn();

        middleware.default.GetPullRequests = jest.fn().mockImplementation((fn) => fn);


        let sut = new GetPRController();
        let result = await sut.get(mReq, mRes);


        done();

    });
});
