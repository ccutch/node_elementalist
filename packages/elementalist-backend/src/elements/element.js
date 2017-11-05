import spawn from 'cross-spawn-promise'

const defaultOptions = {}
const docker = (...args) => spawn('docker', args, defaultOptions)

export default class Element {

  constructor(source, name, port) {
    this.source = source
    this.name = name
    this.port = port
    this.imageName = null
    this.status = 'queued'
  }

  async buildAndDeploy() {
    await this.build()
    await this.deploy()
    this.status = 'deployed'
  }

  build() {
    this.status = 'building'
    // docker build ${source}


  }

  deploy() {
    this.status = 'deploying'
    // this.port = $(next available port)
    // docker run ${image-name} -p *:${this.port}
  }
}
