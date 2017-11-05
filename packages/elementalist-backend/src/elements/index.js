import Element from './element'
import elementManager from './manager'

export function create(source, name) {
  let port = elementManager.nextPort()
  let element = new Element(source, name, port)
  elementManager.add(element)
  element.buildAndDeploy()

  return element
}


export function getAll() {
  return elementManager.elements
}
