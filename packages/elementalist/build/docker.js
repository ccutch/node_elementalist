'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDockerSwarm = initDockerSwarm;
exports.startDockerRegistry = startDockerRegistry;

var _crossSpawnPromise = require('cross-spawn-promise');

var _crossSpawnPromise2 = _interopRequireDefault(_crossSpawnPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const docker = async (options, ...args) => {
  if (typeof options !== 'object') {
    args = [options, ...args];
    options = {};
  }

  args = args.filter(Boolean);
  try {
    let res = await (0, _crossSpawnPromise2.default)('docker', args, options);
    console.log(`docker: ${res.toString('utf-8')}`);
    return res;
  } catch (err) {
    return err.stderr.toString('utf-8');
  }
};

function initDockerSwarm() {
  let { SWARM_HOST: host } = process.env;
  let advertiseAddr = [];
  if (host) {
    advertiseAddr = ['--advertise-addr', `${host}:2377`];
  }

  return docker('swarm', 'init', ...advertiseAddr);
}

function startDockerRegistry() {
  return docker('run', '-d', '-p', '5000:5000', '--name', 'registry', 'registry:2');
}

exports.default = docker;
//# sourceMappingURL=docker.js.map