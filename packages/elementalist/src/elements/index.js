import Element from './Element'
import Supervisor from './Supervisor'

const supervisor = new Supervisor()

// create element return promise of deployment job
export function create(source, name) {
  let element = new Element(source, name)
  return supervisor.deploy(element)
}

// create element, deploy in background and return element
export function createAsync(source, name) {
  let element = new Element(source, name)
  supervisor.deploy(element)

  return element
}

export function getAll() {
  return supervisor.elements
}
