const assert = require('assert');
const getCarMw = require('../../../../middleware/car/getCarMw');

describe('getCarMw middleware', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;
    let mockCarModel;
    let mockTeamModel;

    beforeEach(() => {
        mockRequest = {
            params: {
                carid: '123'
            }
        };
        mockResponse = {
            locals: {}
        };
        mockNext = (err) => {
            if (err) throw err;
        };
    });

    it('should set res.locals.car and res.locals.teams when car is found', async () => {
        const mockCar = {
            _id: '123',
            name: 'Test Car'
        };
        const mockTeams = [
            { _id: '1', name: 'Team 1' },
            { _id: '2', name: 'Team 2' }
        ];

        mockCarModel = {
            findById: () => ({
                populate: () => mockCar
            })
        };

        mockTeamModel = {
            find: () => mockTeams
        };

        const middleware = getCarMw({
            CarModel: mockCarModel,
            TeamModel: mockTeamModel
        });

        await middleware(mockRequest, mockResponse, (err) => {
            assert.strictEqual(err, undefined);
        });

        assert.deepStrictEqual(mockResponse.locals.car, mockCar);
        assert.deepStrictEqual(mockResponse.locals.teams, mockTeams);
    });

    it('should call next with error when car is not found', async () => {
        mockCarModel = {
            findById: () => ({
                populate: () => null
            })
        };

        mockTeamModel = {
            find: () => []
        };

        const middleware = getCarMw({
            CarModel: mockCarModel,
            TeamModel: mockTeamModel
        });

        let errorThrown = false;
        await middleware(mockRequest, mockResponse, (err) => {
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'Car not found');
            errorThrown = true;
        });
        assert.strictEqual(errorThrown, true);
    });

    it('should call next with error when database query fails', async () => {
        const dbError = new Error('Database error');
        mockCarModel = {
            findById: () => {
                throw dbError;
            }
        };

        const middleware = getCarMw({
            CarModel: mockCarModel,
            TeamModel: mockTeamModel
        });

        let errorThrown = false;
        await middleware(mockRequest, mockResponse, (err) => {
            assert.strictEqual(err, dbError);
            errorThrown = true;
        });
        assert.strictEqual(errorThrown, true);
    });

    it('should throw error when CarModel is not provided', () => {
        assert.throws(() => getCarMw({}));
    });

    it('should throw error when TeamModel is not provided', () => {
        assert.throws(() => getCarMw({ CarModel: {} }));
    });
});