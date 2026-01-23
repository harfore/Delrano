jest.mock('bcrypt', () => ({
    hash: jest.fn(() => Promise.resolve('hashed_pw')),
    compare: jest.fn(() => Promise.resolve(true))
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'fake_jwt'),
    verify: jest.fn(() => ({ userId: 1 }))
}));

jest.mock('../../config/database', () => {
    const mockUsers = [];

    return {
        mockUsers,
        query: jest.fn(async (sql, params) => {
            if (sql.includes('INSERT INTO users')) {
                const [email, username, password, country] = params;
                const newUser = { id: mockUsers.length + 1, email, username, password, country };
                mockUsers.push(newUser);
                return { rows: [newUser] };
            }

            if (sql.includes('SELECT * FROM users WHERE email')) {
                const [identifier] = params;
                const user = mockUsers.find(u => u.email === identifier || u.username === identifier);
                return { rows: user ? [user] : [] };
            }

            if (sql.includes('SELECT id, username, email FROM users WHERE id = $1')) {
                const [id] = params;
                const user = mockUsers.find(u => u.id === id);
                return { rows: user ? [user] : [] };
            }

            return { rows: [] };
        })
    };
});

const pool = require('../../config/database')

const authController = require('../../controllers/authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mockReq = (body = {}, headers = {}) => ({
    body,
    headers
});

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        pool.mockUsers.length = 0;
    });

    test('register() should create a user and return token', async () => {
        const req = mockReq({
            email: 'test@example.com',
            username: 'tester',
            password: 'pass123',
            country: 'USA'
        });

        const res = mockRes();

        await authController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.any(Object),
            token: 'fake_jwt'
        }));
    });

    test('login() should succeed with valid credentials', async () => {
        await pool.query(
            'INSERT INTO users (email, username, password, country) VALUES ($1,$2,$3,$4)',
            ['login@example.com', 'loginuser', 'hashed_pw', 'SY']
        );

        const req = mockReq({
            email: 'login@example.com',
            password: 'pass123'
        });

        const res = mockRes();

        await authController.login(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            token: 'fake_jwt',
            user: expect.any(Object)
        }));
    });

    test('verify() should return user data when token valid', async () => {
        await pool.query(
            'INSERT INTO users (email, username, password, country) VALUES ($1,$2,$3,$4)',
            ['verify@example.com', 'verifyuser', 'hashed_pw', 'SY']
        );

        const req = mockReq({}, { authorization: 'Bearer validtoken' });
        const res = mockRes();

        await authController.verify(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            user: expect.any(Object)
        }));
    });
});