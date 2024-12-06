const assert = require('assert');
const getTeamMw = require('../../../../middleware/team/getTeamMw');

describe('getTeamMw middleware', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let mockTeamModel;

    beforeEach(() => {
        mockRequest = {
            params: {
                teamid: '123'
            }
        };
        mockResponse = {
            locals: {}
        };
        mockNext = (err) => {
            if (err) throw err;
        };
    });

    it('should set res.locals.team when team is found', async () => {
        const mockTeam = {
            _id: '123',
            name: 'Test Team'
        };

        mockTeamModel = {
            findById: () => mockTeam
        };

        const middleware = getTeamMw({
            TeamModel: mockTeamModel
        });

        await middleware(mockRequest, mockResponse, (err) => {
            assert.strictEqual(err, undefined);
        });

        assert.deepStrictEqual(mockResponse.locals.team, mockTeam);
    });

    it('should call next with error when team is not found', async () => {
        mockTeamModel = {
            findById: () => null
        };

        const middleware = getTeamMw({
            TeamModel: mockTeamModel
        });

        let errorThrown = false;
        await middleware(mockRequest, mockResponse, (err) => {
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'Team not found');
            errorThrown = true;
        });
        assert.strictEqual(errorThrown, true);
    });

    it('should call next with error when database query fails', async () => {
        const dbError = new Error('Database error');
        mockTeamModel = {
            findById: () => {
                throw dbError;
            }
        };

        const middleware = getTeamMw({
            TeamModel: mockTeamModel
        });

        let errorThrown = false;
        await middleware(mockRequest, mockResponse, (err) => {
            assert.strictEqual(err, dbError);
            errorThrown = true;
        });
        assert.strictEqual(errorThrown, true);
    });

    it('should throw error when TeamModel is not provided', () => {
        assert.throws(() => getTeamMw({}));
    });
});