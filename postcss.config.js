module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: false
          },
          autoprefixer: false
        }
      ]
    })
  ]
};
