const mockUsers = [];

const pool = {
    mockUsers,
    query: jest.fn(async (sql, params) => {
        if (sql.includes('INSERT INTO users')) {
            const [email, username, password, country] = params;
            const newUser = {
                id: mockUsers.length + 1,
                email,
                username,
                password,
                country
            };
            mockUsers.push(newUser);
            return { rows: [newUser] };
        }

        if (sql.includes('SELECT * FROM users WHERE email')) {
            const [identifier] = params;
            const user = mockUsers.find(
                u => u.email === identifier || u.username === identifier
            );
            return { rows: user ? [user] : [] };
        }

        return { rows: [] };
    })
};

module.exports = pool;