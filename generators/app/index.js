'use strict';
const chalk = require('chalk');
const packagejs = require('../../package.json');
const shelljs = require('shelljs');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const utils = require('./utils');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.configOptions = {};
    // This adds support for a `--interactive` flag
    this.option('interactive', {
      desc: "Don't prompt user when running flutter start",
      type: Boolean,
      defaults: true
    });

    // This adds support for a `--install` flag
    this.option('installDeps', {
      desc: "Don't install dependencies when running flutter start",
      type: Boolean,
      defaults: true
    });

    this.interactive = this.options.interactive;
    this.installDeps = this.options.installDeps;
  }

  get initializing() {
    return {
      init(args) {
        if (args === 'default') {
          this.defaultApp = true;
          this.interactive = false;
        }
      },
      readConfig() {
        this.jhipsterAppConfig = this.getJhipsterAppConfig();
      },
      displayLogo() {
        // It's here to show that you can use functions from generator-jhipster
        // this function is in: generator-jhipster/generators/generator-base.js
        // this.printJHipsterLogo();

        // Have Yeoman greet the user.
        this.log(
          `\nWelcome to the ${chalk.bold.blue(
            'Flutter'
          )} boilerplate for ${chalk.bold.green('J')}${chalk.bold.red(
            'Hipster'
          )}! ${chalk.yellow(`v${packagejs.version}\n`)}`
        );
      }
    };
  }

  async prompting() {
    const done = this.async();
    const messageAskForPath =
      'Enter the directory where your JHipster Backend is located:';
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What do you want to name your Flutter application?',
        default: 'flutterApp'
      },
      {
        type: 'input',
        name: 'directoryPath',
        message: messageAskForPath,
        default: '../backend',
        validate: input => {
          const path = this.destinationPath(input);
          if (shelljs.test('-d', path)) {
            const appsFolders = utils.getAppFolder.call(this, input);
            if (appsFolders.length === 0) {
              return `No application found in ${path}`;
            }
            return true;
          }
          return `${path} is not a directory or doesn't exist`;
        }
      }
    ]);

    if (this.defaultApp) {
      this.ionicAppName = 'ionic4j';
      this.directoryPath = 'backend';
      done();
    }
    done();
  }

  Writing() {
    this.log(this.answers);

    this.template = function(source, destination) {
      this.fs.copy(this.templatePath(source), this.destinationPath(destination));
    };
    this.templateTpl = function(source, destination, props) {
      this.log(source, destination, props);
      this.fs.copyTpl(
        this.templatePath(source),
        this.destinationPath(destination),
        props
      );
    };
    this.template('android', 'android');
    this.template('assets', 'assets');
    this.template('ios', 'ios');
    this.template('test', 'test');

    this.template('README.md', 'README.md');
    this.template('.gitignore', '.gitignore');
    // Templating
    this.templateTpl('lib/style/theme.dart.ejs', 'lib/style/theme.dart', this.answers);
    this.templateTpl(
      'lib/ui/login_page.dart.ejs',
      'lib/ui/login_page.dart',
      this.answers
    );
    this.templateTpl(
      'lib/utils/bubble_indication_painter.dart.ejs',
      'lib/utils/bubble_indication_painter.dart',
      this.answers
    );
    this.templateTpl('lib/main.dart.ejs', 'lib/main.dart', this.answers);
    this.templateTpl('test/widget_test.dart.ejs', 'test/widget_test.dart', this.answers);

    this.templateTpl('pubspec.yaml.ejs', 'pubspec.yaml', this.answers);
  }

  install() {
    this.spawnCommand('flutter', ['doctor']);
    this.spawnCommand('flutter', ['packages', 'get']);
  }
};
