module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'controllers/**/*.js',
        '!tests/**',
        '!node_modules/**'
    ],
    coverageDirectory: 'coverage',
    testMatch: [
        '**/__tests__/**/*.test.js'
    ],
    setupFilesAfterEnv: ['<rootDir>/__tests__/setup/testSetup.js']
};