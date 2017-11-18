import assert from 'assert'
import Element from './Element'
import docker from '../docker'

export default class Manager {
  constructor(element) {
    // assert(this.element instanceof Element)
    this.element = element
  }

  async startup() {
    await this.build()
    await this.getImagePorts()
    await this.deploy()
    await this.getPublishedPorts()

    this.element.status = 'deployed'
  }

  async shutdown() {
    // TODO: write shutdown logic
  }

  async build() {
    this.element.status = 'building'
    this.element.imageName = `localhost:5000/${this.element.name}`

    await docker(
      'build',
      '--no-cache=true',
      '--tag',
      this.element.imageName,
      this.element.source
    )
    await docker('push', this.element.imageName)

    this.element.status = 'built'
  }

  async getImagePorts() {
    let port = await docker(
      'inspect',
      '--format',
      '{{range $p, $conf := .Config.ExposedPorts}}{{$p}} {{end}}',
      this.element.imageName
    )
    port = port
      .toString('utf-8')
      .trim()
      .split(' ')[0]

    this.element.internalPort = port
  }

  async deploy() {
    this.element.status = 'deploying'

    await docker(
      'service',
      'create',
      '--detach=false',
      '--name',
      this.element.name,
      '--publish',
      this.element.internalPort,
      this.element.imageName
    )

    this.element.status = 'deployed'
  }

  async getPublishedPorts() {
    let ports = await docker(
      'service',
      'inspect',
      '--format',
      '{{range .Endpoint.Ports}}{{.PublishedPort}} {{end}}',
      this.element.name
    )

    this.element.port = ports
      .toString('utf-8')
      .trim()
      .split(' ')[0]
  }
}
