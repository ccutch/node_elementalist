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

class Deployer {
  constructor(element) {
    // assert(this.element instanceof Element)
    this.element = element;
  }

  async run() {
    await this.buildImage();
    await this.getImagePorts();
    await this.createService();
    await this.getPublishedPorts();

    this.element.status = 'deployed';
  }

  async buildImage() {
    this.element.status = 'building';
    this.element.imageName = `localhost:5000/${this.element.name}`;

    await (0, _docker2.default)('build', '--tag', this.element.imageName, this.element.source);
    await (0, _docker2.default)('push', this.element.imageName);
  }

  async getImagePorts() {
    let ports = (await (0, _docker2.default)('inspect', '--format', '{{range $p, $conf := .Config.ExposedPorts}}{{$p}} {{end}}', this.element.imageName)).toString('utf-8').trim().split(' ');

    this.element.internalPorts = ports;
  }

  async createService() {
    this.element.status = 'deploying';
    let ports = this.element.internalPorts.map(port => {
      return `--publish=:${port}`;
    });

    await (0, _docker2.default)('service', 'create', '--name', this.element.name, ...ports, this.element.imageName);
  }

  async getPublishedPorts() {
    let ports = await (0, _docker2.default)('service', 'inspect', '--format', '{{range .Endpoint.Ports}}{{.PublishedPort}} {{end}}', this.element.name);

    this.element.ports = ports.toString('utf-8').trim().split(' ');
  }
}
exports.default = Deployer;
//# sourceMappingURL=Deployer.js.map