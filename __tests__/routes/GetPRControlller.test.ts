import GetPRController from "../../src/routes/GetPRController";

describe('GetPRController', function() {
    it('add', function() {
        const mReq: any = {
            get: jest.fn((name) => {
                if (name === 'content-type') return 'text/plain';
            })
        };
        const mRes: any = {
            send: jest.fn()
        };
        let sut = new GetPRController();
        let result = sut.get(mReq, mRes);


    });
});
