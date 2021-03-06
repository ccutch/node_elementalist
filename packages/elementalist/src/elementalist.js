import docker from './docker'

// submodules
import * as elements from './elements'
export { elements }

export let state = 'loading'

function initDockerSwarm() {
  let { SWARM_HOST: host } = process.env
  let advertiseAddr = []
  if (host) {
    advertiseAddr = ['--advertise-addr', `${host}:2377`]
  }

  return docker('swarm', 'init', ...advertiseAddr)
}

function startDockerRegistry() {
  return docker(
    'run',
    '-d',
    '-p',
    '5000:5000',
    '--name',
    'registry',
    'registry:2'
  )
}

export async function bootstrap() {
  state = 'initializing'
  try {
    let res = await initDockerSwarm()
    console.log(res.toString('utf-8'))
  } catch (error) {
    console.log(error.exitStatus, error.stderr.toString('utf-8'))
  }

  try {
    let res = await startDockerRegistry()
    console.log(res.toString('utf-8'))
  } catch (error) {
    console.log('registry already running')
  }

  state = 'ready'
}
