'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Manager = require('./Manager');

var _Manager2 = _interopRequireDefault(_Manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Supervisor {
  constructor() {
    this.managers = [];
  }

  get elements() {
    return this.managers.map(m => m.element);
  }

  async deploy(element) {
    let manager = new _Manager2.default(element);
    this.managers.push(manager);

    try {
      await manager.startup();
    } catch (error) {
      element.status = 'failed';
      element.error = error;
    }

    return manager;
  }
}
exports.default = Supervisor;
//# sourceMappingURL=Supervisor.js.map