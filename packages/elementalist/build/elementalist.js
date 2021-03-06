'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.elements = undefined;
exports.bootstrap = bootstrap;

var _docker = require('./docker');

var _docker2 = _interopRequireDefault(_docker);

var _elements = require('./elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.elements = elements;

// submodules

let state = exports.state = 'loading';

function initDockerSwarm() {
  let { SWARM_HOST: host } = process.env;
  let advertiseAddr = [];
  if (host) {
    advertiseAddr = ['--advertise-addr', `${host}:2377`];
  }

  return (0, _docker2.default)('swarm', 'init', ...advertiseAddr);
}

function startDockerRegistry() {
  return (0, _docker2.default)('run', '-d', '-p', '5000:5000', '--name', 'registry', 'registry:2');
}

async function bootstrap() {
  exports.state = state = 'initializing';
  try {
    let res = await initDockerSwarm();
    console.log(res.toString('utf-8'));
  } catch (error) {
    console.log(error.exitStatus, error.stderr.toString('utf-8'));
  }

  try {
    let res = await startDockerRegistry();
    console.log(res.toString('utf-8'));
  } catch (error) {
    console.log('registry already running');
  }

  exports.state = state = 'ready';
}
//# sourceMappingURL=elementalist.js.map