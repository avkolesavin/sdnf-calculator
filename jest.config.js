const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@material|lodash-es).+\\.js$',
        // eslint-disable-next-line no-useless-escape
        '.*\.path$',
    ],
    roots: [
        path.resolve(__dirname, './'),
    ],
};