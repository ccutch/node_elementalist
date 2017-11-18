import Manager from './Manager'

export default class Supervisor {
  constructor() {
    this.managers = []
  }

  get elements() {
    return this.managers.map(m => m.element)
  }

  async deploy(element) {
    let manager = new Manager(element)
    this.managers.push(manager)

    try {
      await manager.startup()
    } catch (error) {
      element.status = 'failed'
      element.error = error
    }

    return manager
  }
}
