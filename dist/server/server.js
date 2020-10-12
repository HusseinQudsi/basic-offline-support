"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const dir = __dirname; // TODO: move to config

const fileConfig = {
  publicDir: '/../public',
  index: '/../public/index.html'
};
app.use(_express.default.static(dir + fileConfig.publicDir));

const server = () => app.listen(_config.default.port, () => _config.default.log.logs && console.log(`REST API on http://localhost:${_config.default.port}/`));

exports.server = server;