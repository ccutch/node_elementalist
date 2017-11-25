'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _docker = require('../docker');

var _docker2 = _interopRequireDefault(_docker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Manager {
  constructor(element) {
    // assert(this.element instanceof Element)
    this.element = element;
  }

  async startup() {
    await this.build();
    await this.getImagePorts();
    await this.deploy();
    await this.getPublishedPorts();

    this.element.status = 'deployed';
  }

  async shutdown() {
    // TODO: write shutdown logic
  }

  async build() {
    this.element.status = 'building';
    this.element.imageName = `localhost:5000/${this.element.name}`;

    await (0, _docker2.default)('build', '--no-cache=true', '--tag', this.element.imageName, this.element.source);
    await (0, _docker2.default)('push', this.element.imageName);

    this.element.status = 'built';
  }

  async getImagePorts() {
    let port = await (0, _docker2.default)('inspect', '--format', '{{range $p, $conf := .Config.ExposedPorts}}{{$p}} {{end}}', this.element.imageName);
    port = port.toString('utf-8').trim().split(' ')[0];

    this.element.internalPort = port;
  }

  async deploy() {
    this.element.status = 'deploying';

    await (0, _docker2.default)('service', 'create', '--detach=false', '--name', this.element.name, '--publish', this.element.internalPort, this.element.imageName);

    this.element.status = 'deployed';
  }

  async getPublishedPorts() {
    let ports = await (0, _docker2.default)('service', 'inspect', '--format', '{{range .Endpoint.Ports}}{{.PublishedPort}} {{end}}', this.element.name);

    this.element.port = ports.toString('utf-8').trim().split(' ')[0];
  }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map