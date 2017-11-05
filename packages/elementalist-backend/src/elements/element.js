import spawn from 'cross-spawn-promise'

const defaultOptions = {stdio: 'inherit'}
const dockerWith = (options, ...args) => spawn('docker', args, options)
const docker = (...args) => dockerWith(defaultOptions, ...args)

export default class Element {

  constructor(source, name) {
    this.source = source
    this.name = name
    this.port = null
    this.imageName = null
    this.status = 'queued'
  }

  async buildAndDeploy() {
    await this.build()
    await this.deploy()
    this.status = 'deployed'
  }

  async build() {
    this.status = 'building'
    // docker build ${source}
    console.log('building: ', this.name)
    await docker('build', `-t=${this.name}`, this.source)
  }

  async deploy() {
    this.status = 'deploying'
    await docker('run', '-d', '-P', '--name', this.name, this.name)

    let res = await dockerWith({}, 'port', this.name)
    res = res.toString('utf8')

    this.port = parseInt(res.split(':')[1], 10)
  }
}
