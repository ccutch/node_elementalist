// Element model class, add database persistance here
export default class Element {
  constructor(source, name) {
    this.source = source
    this.name = name
    this.imageName = null
    this.internalPort = null
    this.port = null

    this.status = 'queued'
  }
}
