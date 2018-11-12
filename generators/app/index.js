'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the prime ${chalk.red('generator-jhipster-flutter')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.template = function(source, destination) {
      this.fs.copy(this.templatePath(source), this.destinationPath(destination));
    };
    this.template('android', 'android');
    this.template('assets', 'assets');
    this.template('ios', 'ios');
    this.template('lib', 'lib');
    this.template('test', 'test');
    this.template('pubspec.yaml', 'pubspec.yaml');
    this.template('README.md', 'README.md');
    this.template('.gitignore', '.gitignore');
  }

  install() {
    // This.installDependencies();
    this.spawnCommand('flutter', ['doctor']);
    this.spawnCommand('flutter', ['packages', 'get']);
  }
};
