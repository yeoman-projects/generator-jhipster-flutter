'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-jhipster-flutter:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ appName: 'easypos', directoryPath: '../../easypos' });
  });

  it('creates files', () => {
    assert.file(['android']);
    assert.file(['assets']);
    assert.file(['ios']);
    assert.file(['lib']);
    assert.file(['test']);
    assert.file(['lib/style/theme.dart']);
    assert.file(['lib/ui/login_page.dart']);
    assert.file(['lib/utils/bubble_indication_painter.dart']);
    assert.file(['test/widget_test.dart']);
    assert.file(['pubspec.yaml']);
  });
});
