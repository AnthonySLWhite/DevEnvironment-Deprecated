const npsUtils = require('nps-utils');

// <-------------- Development PORT --------------> //
const PORT = 3000;

module.exports = {
  scripts: {
    default: {
      // NPM START for deployment
      script: 'nps nodemon.node.production',
      hiddenFromHelp: true,
    },
    build: {
      script: npsUtils.series.nps('parcel.node.build'),
      description: 'Build Node for production',
    },
    /*
    <==========================================>
    <                  Node.js                 >
    <==========================================>
    */
    node: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps(
          'parcel.node',
          'nodemon.node',
        ),
        description: 'Development mode for Node.js',
      },
      // Builds
      build: {
        default: {
          script: npsUtils.series.nps('parcel.node.build'),
          description: 'Build Node.js project',
        },
        run: {
          script: npsUtils.series.nps(
            'parcel.node.build',
            'nodemon.node',
          ),
          description: 'Build Node.js project and run server',
        },
      },
      test: {
        default: {
          script:
            'cross-env NODE_ENV=development mocha --require babel-core/register src/**/*.test.js',
          description: 'Mocha test',
        },
        watch: {
          script:
            'cross-env NODE_ENV=development nodemon --exec "npm start test"',
          description: 'Mocha test watcher',
        },
      },
      // Debug mode
      debug: {
        script: npsUtils.concurrent.nps(
          'parcel.node',
          'nodemon.node.debug',
        ),
        description: 'Debug Node.js project',
      },
    },
    /*
    <==========================================>
    <                   Nodemon                >
    <==========================================>
    */
    nodemon: {
      node: {
        // Default as development
        default: {
          script:
            'cross-env NODE_ENV=development nodemon ./dist/app.js',
          hiddenFromHelp: true,
        },
        production: {
          script:
            'cross-env NODE_ENV=production nodemon ./prod/app.js',
          hiddenFromHelp: true,
        },
        debug: {
          script: 'nodemon --inspect-brk ./dist/app.js',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                    Parcel                >
    <==========================================>
    */
    parcel: {
      node: {
        default: {
          script:
            'cross-env NODE_ENV=development parcel watch src/app.js --public-url ./ --target node',
          hiddenFromHelp: true,
        },
        build: {
          script:
            'cross-env NODE_ENV=production parcel build src/app.js --public-url ./ --out-dir prod --target node',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                  EsLint                  >
    <==========================================>
    */
    eslint: {
      default: {
        script: 'eslint --fix --no-ignore **/*.js',
        description: 'Run Eslint Fix',
      },
    },
    /*
    <==========================================>
    <                  MongoDB                 >
    <==========================================>
    */
    // <-------------- Add your own MongoDB path --------------> //
    mongodb: {
      script: 'mongod.exe --dbpath \\path-to-MongoDB-data\\',
      description: 'Run MongoDB server',
      hiddenFromHelp: true,
    },
    /*
    <==========================================>
    <                  Others                  >
    <==========================================>
    */
    localTunnel: {
      script: `lt --port ${PORT} `,
      description: `Expose localhost port ${PORT}`,
    },
    update: {
      script: 'npx npm-check -u',
      description: 'Package interactive updater',
    },
  },
};
