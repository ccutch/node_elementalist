'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _docker = require('../docker');

var _docker2 = _interopRequireDefault(_docker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Element {
  constructor(source, name) {
    this.source = source;
    this.name = name;
    this.port = null;
    this.isotopes = [];
    this.status = 'queued';
  }

  async buildAndDeploy() {
    await this.build();
    await this.createService();
    // await this.createIsotope()

    this.status = 'deployed';
  }

  async build() {
    this.status = 'building';
    // docker build ${source}
    console.log('building: ', this.name);
    console.log((await (0, _docker2.default)('build', `-t=192.168.99.100:5000/${this.name}`, this.source)).toString('utf-8'));
    console.log((await (0, _docker2.default)('push', `192.168.99.100:5000/${this.name}`)).toString('utf-8'));
  }

  async createService() {
    this.status = 'deploying';
    await (0, _docker2.default)('service', 'create', '--name', this.name, `192.168.99.100:5000/${this.name}`);
  }
}
exports.default = Element;
//# sourceMappingURL=Element.js.map