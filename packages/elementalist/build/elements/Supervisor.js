'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Deployer = require('./Deployer');

var _Deployer2 = _interopRequireDefault(_Deployer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Supervisor {
  constructor() {
    this.deployers = [];
  }

  get elements() {
    return this.deployers.map(d => d.element);
  }

  async deploy(element) {
    let deployer = new _Deployer2.default(element);
    this.deployers.push(deployer);

    try {
      await deployer.run();
    } catch (error) {
      element.status = 'Failed';
      element.error = error;
    }
  }
}
exports.default = Supervisor;
//# sourceMappingURL=Supervisor.js.map