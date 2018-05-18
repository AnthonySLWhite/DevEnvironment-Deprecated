var path = require('path');

module.exports = {
    //Creates a bundle out of app.js with babel-polyfill appended
    entry: [ /*"babel-polyfill", */ (__dirname + '/src/assets/js/app.js')],
    output: {
        path: path.join(__dirname, '/src/Assets'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }]
    }
};
