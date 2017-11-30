'use strict';

var defaultTargets = {
  browsers: ['last 1 version', 'ie >= 11']
};

var modulesPlugin = [
  require('babel-plugin-transform-es2015-modules-commonjs'),
  { strict: false }
];

var runtimePlugin = require('babel-plugin-transform-runtime');

module.exports = function(context, options) {
  options = options || {};

  var targets = options.targets || defaultTargets;
  var modules = typeof options.modules === 'boolean' ? options.modules : true;
  var runtime = typeof options.runtime === 'boolean' ? options.runtime : false;
  var react = typeof options.react === 'boolean' ? options.react : true;
  var flow = typeof options.flow === 'boolean' ? options.flow : true;
  var debug = typeof options.debug === 'boolean' ? options.debug : false;
  var asyncFunctions = typeof options.asyncFunctions === 'boolean' ? options.asyncFunctions : false;

  return {
    presets: [
      require('babel-preset-env').default(null, {
        debug: debug,
        exclude: [
          asyncFunctions === false ? 'transform-async-to-generator' : null,
          asyncFunctions === false ? 'transform-regenerator' : null,
        ].filter(Boolean),
        modules: false,
        targets: targets
      }),
      react === true ? require('babel-preset-react') : null,
      flow === true ? require('babel-preset-flow') : null,
    ].filter(Boolean),
    plugins: [
      modules === true ? modulesPlugin : null,
      runtime === true ? runtimePlugin : null,
      require('babel-plugin-transform-object-rest-spread'),
      require('babel-plugin-transform-class-properties')
    ].filter(Boolean)
  };
};
