var path = require('path');

module.exports = {
    watch: true,
    //Creates a bundle out of app.js with babel-polyfill appended
    entry: [/*"babel-polyfill", */(__dirname + '/src/js/app.js')],
    output: {
        path: path.join(__dirname, '/src/Assets'),
        filename: 'index.js'
    },
    module: {
        rules: [{
                // test: /\.js$/,
                // exclude: /node_modules/,
                // use: [{
                //     loader: 'babel-loader',
                //     query: {
                //         presets: ["react"]
                //     }
                // }]
            }
        ]
    }
};
