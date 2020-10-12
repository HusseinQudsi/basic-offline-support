"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const processVars = process.env;
const env = processVars.NODE_ENV || 'development';
const port = processVars.PORT || 3000;
let envConfig = {};

switch (env) {
  case 'production':
    envConfig = require('./production').config;
    break;

  case 'development':
    envConfig = require('./development').config;
    break;

  default:
    envConfig = require('./development').config;
}

const globalConfig = {
  env,
  port,
  isDev: env === 'development',
  isTest: env === 'testing'
};

var _default = Object.assign(globalConfig, envConfig);

exports.default = _default;