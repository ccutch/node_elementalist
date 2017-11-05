import Element from './element'
import elementManager from './manager'

export function create(source, name) {
  let port = null
  let element = new Element(source, name)
  elementManager.add(element)
  element.buildAndDeploy()

  return element
}


export function getAll() {
  return elementManager.elements
}
