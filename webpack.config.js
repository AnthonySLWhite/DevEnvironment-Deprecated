var path = require("path");

module.exports = {
  //Creates a bundle out of app.js with babel-polyfill appended
  entry: [/*"babel-polyfill", */ __dirname + "/src/assets/js/app.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
