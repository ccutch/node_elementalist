'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elements = undefined;
exports.bootstrap = bootstrap;

var _docker = require('./docker');

var _elements = require('./elements');

var elements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.elements = elements;

// submodules

async function bootstrap() {
  try {
    await (0, _docker.initDockerSwarm)();
  } catch (error) {
    console.log(error.exitStatus, error.stderr.toString('utf-8'));
    // Load existing services as elements
    // Or require SWARM_HOST environment variable
  }

  try {
    await (0, _docker.startDockerRegistry)();
  } catch (error) {
    console.log('registry already running');
  }
}
//# sourceMappingURL=elementalist.js.map