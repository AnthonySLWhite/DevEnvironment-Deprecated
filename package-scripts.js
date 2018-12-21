const npsUtils = require('nps-utils');
module.exports = {
  scripts: {
    // prettier: 'prettier --config ./.prettierrc.js src/app.js --write',
    // eslint: 'eslint --fix src/app.js',
    // test: 'eslint --print-config .eslintrc.json | eslint-config-prettier-check',
    default: {
      // NPM START for deployment
      script: 'nps nodemon.node.production',
      hiddenFromHelp: true,
    },
    /*
    <==========================================>
    <                  Node.js                 >
    <==========================================>
    */
    node: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps('parcel.node', 'nodemon-dev'),
        description: 'Development mode for Node.js',
      },
      // Builds
      build: {
        default: {
          script: npsUtils.concurrent.nps('parcel:build'),
          description: 'Build Node.js project',
        },
        run: {
          script: npsUtils.series.nps('parcel:build', 'nodemon-prod'),
          description: 'Build Node.js project and run server',
        },
      },
      // Debug mode
      debug: {
        script: npsUtils.concurrent.nps('parcel.node', 'nodemon.node.debug'),
        description: 'Debug Node.js project',
      },
    },
    /*
    <==========================================>
    <                    DOM                   >
    <==========================================>
    */
    dom: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps('sass', 'parcel-frontend', 'nodemon-frontend'),
        description: 'Development mode for DOM',
      },
      // Builds
      build: {
        default: {
          script: npsUtils.series.nps('sass:build', 'prefixer', 'parcel-frontend:build'),
          description: 'Build DOM project',
        },
        run: {
          script: npsUtils.series.nps('sass:build', 'prefixer', 'parcel-frontend:build', 'nodemon-frontend'),
          description: 'Build DOM project and run server',
        },
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
          script: 'cross-env NODE_ENV=development nodemon ./dist/app.js',
          hiddenFromHelp: true,
        },
        production: {
          script: 'cross-env NODE_ENV=production nodemon ./prod/app.js',
          hiddenFromHelp: true,
        },
        debug: {
          script: 'nodemon --inspect-brk ./dist/app.js',
          hiddenFromHelp: true,
        },
      },

      dom: {
        default: {
          script: 'cross-env NODE_ENV=production FrontEnd=true nodemon ./prod/app.js',
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
          script: 'cross-env NODE_ENV=development parcel watch src/app.js --public-url ./ --target node',
          hiddenFromHelp: true,
        },
        build: {
          script: 'cross-env NODE_ENV=production parcel build src/app.js --public-url ./ --out-dir prod --target node',
          hiddenFromHelp: true,
        },
      },
      dom: {
        default: {
          script:
            'cross-env NODE_ENV=development parcel watch public/src/index.html --out-dir public/dist --target browser',
          hiddenFromHelp: true,
        },
        build: {
          script:
            'cross-env NODE_ENV=production parcel build public/src/index.html --out-dir public/prod --target browser',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                  Sass/CSS                >
    <==========================================>
    */
    sass: {
      default: {
        // Initial build of sass then watch for file changes
        script: npsUtils.series.nps('sass.build', 'sass.watch'),
        hiddenFromHelp: true,
      },
      build: {
        script: 'node-sass -o "public/src/assets/css" --source-map true "public/src/assets/css"',
        hiddenFromHelp: true,
      },
      watch: {
        script:
          'node-sass --watch -r --include-path "public/src/assets/css" -o "public/src/assets/css" --source-map true "public/src/assets/css/"',
        hiddenFromHelp: true,
      },
      prefixer: {
        script: 'postcss -r --config postcss.build.config.js "public/src/assets/css/style.css"',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                  EsLint                  >
    <==========================================>
    */
    eslint: {
      default: {
        script: 'eslint --fix src/app.js',
        hiddenFromHelp: true,
      },
    },
    prettierEslint:
      'prettier-eslint --eslint-config-path .eslintrc.json --trailing-comma all --single-quote true "src/**/*.js"',
    test: 'eslint --print-config .eslintrc.json | eslint-config-prettier-check',
    upgradeInteractive: 'npm-check --update',
  },
};
