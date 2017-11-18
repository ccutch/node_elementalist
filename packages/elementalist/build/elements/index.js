'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAll = getAll;

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _Supervisor = require('./Supervisor');

var _Supervisor2 = _interopRequireDefault(_Supervisor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const supervisor = new _Supervisor2.default();

function create(source, name) {
  let element = new _Element2.default(source, name);
  supervisor.deploy(element);

  return element;
}

function getAll() {
  return supervisor.elements;
}
//# sourceMappingURL=index.js.map