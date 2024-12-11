const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const defaultEntry = defaultConfig.entry();

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultEntry,
        'index': './src/index.js'
    }
};
