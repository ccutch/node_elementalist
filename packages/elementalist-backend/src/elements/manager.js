
class ElementManager {

  constructor() {
    this.elements = []
    this.startPort = 4000 
  }

  add(element) {
    this.elements.push(element)
  }

  nextPort() {
    return this.startPort + this.elements.length + 1
  }
}


export default new ElementManager()