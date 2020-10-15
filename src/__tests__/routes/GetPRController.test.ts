import * as sinon from 'sinon';
import GetPRController from "../../routes/GetPRController";
import {GetPullRequests}  from "../../middleware/GetPullRequests";
import { Request, Response } from 'express';

describe('GetPRController', function() {
    it('get', async function(done) {


        const mReq = {} as Request;
        const mRes = {} as Response;
        mRes.header = sinon.stub();
        mRes.send = sinon.stub();

       // sinon.stub(PRService, 'GetPullRequests').resolves([],  "some error");
        sinon.stub(GetPullRequests);


        let sut = new GetPRController();
        let result = await sut.get(mReq, mRes);

        sinon.assert.calledOnce(mRes.send);
        sinon.assert.calledWith(mRes.send, "some error");
        done();

    });
});
