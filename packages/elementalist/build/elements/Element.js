'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Element model class, add database persistance here
class Element {
  constructor(source, name) {
    this.source = source;
    this.name = name;
    this.imageName = null;
    this.internalPort = null;
    this.port = null;

    this.status = 'queued';
  }
}
exports.default = Element;
//# sourceMappingURL=Element.js.map