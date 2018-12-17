const npsUtils = require('nps-utils');
module.exports = {
  scripts: {
    test: npsUtils.concurrent.nps('test2'),
    test2: 'echo thats 1',
    test3: 'echo thats 2',
    herokuPrebuild: npsUtils.concurrent.nps('parcel:build'),
    prepack: npsUtils.concurrent.nps('parcel:build'),
    default: npsUtils.concurrent.nps('nodemon-prod'),
    /*
    <==========================================>
    <                  Node.js                 >
    <==========================================>
    */
    codeN: {
      default: npsUtils.concurrent.nps('parcel', 'nodemon-dev'),
      build: npsUtils.series.nps('parcel:build', 'nodemon-prod')
    },
    buildN: npsUtils.concurrent.nps('parcel:build'),
    /*
    <==========================================>
    <                    DOM                   >
    <==========================================>
    */
    codeF: {
      default: 'npm-run-all --parallel nodemon-frontend sass parcel-frontend',
      build:
        'npm-run-all --sequential sass:build prefixer parcel-frontend:build codeN:build'
    },
    buildF:
      'npm-run-all --sequential sass:build prefixer parcel-frontend:build',
    /*
    <==========================================>
    <                 Nodemon-Node             >
    <==========================================>
    */
    nodemonDev: 'cross-env NODE_ENV=development nodemon ./dist/app.js',
    nodemonProd: 'cross-env NODE_ENV=production nodemon ./prod/app.js',
    debug: 'nodemon --inspect-brk ./dist/app.js',
    /*
    <==========================================>
    <                 Nodemon-DOM              >
    <==========================================>
    */
    nodemonFrontend:
      'cross-env NODE_ENV=production FrontEnd=true nodemon ./prod/app.js',
    /*
    <==========================================>
    <                 DOM-Scripts              >
    <==========================================>
    */
    sass: {
      default: 'npm-run-all --sequential sass:build sass:watch',
      watch:
        'node-sass --watch -r --include-path "public/src/assets/css" -o "public/src/assets/css" --source-map true "public/src/assets/css/"',
      build:
        'node-sass -o "public/src/assets/css" --source-map true "public/src/assets/css"'
    },
    prefixer:
      'postcss -r --config postcss.build.config.js "public/src/assets/css/style.css" ',
    /*
    <==========================================>
    <                Parcel-Scripts            >
    <==========================================>
    */
    parcel: {
      default: 'parcel watch src/app.js --public-url ./ --target node',
      build:
        'parcel build src/app.js --public-url ./ --out-dir prod --target node'
    },
    parcelFrontend: {
      default:
        'cross-env NODE_ENV=development parcel watch public/src/index.html --out-dir public/dist --target browser',
      build:
        'cross-env NODE_ENV=production parcel build public/src/index.html --out-dir public/prod --target browser'
    }
  }
};
