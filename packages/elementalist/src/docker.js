import spawn from 'cross-spawn-promise'

const docker = async (options, ...args) => {
  if (typeof options !== 'object') {
    args = [options, ...args]
    options = {}
  }

  args = args.filter(Boolean)
  try {
    return await spawn('docker', args, options)
  } catch (err) {
    return err.stderr.toString('utf-8')
  }
}

export function initDockerSwarm() {
  let { SWARM_HOST: host } = process.env
  let advertiseAddr = []
  if (host) {
    advertiseAddr = ['--advertise-addr', `${host}:2377`]
  }

  return docker('swarm', 'init', ...advertiseAddr)
}

export function startDockerRegistry() {
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

export default docker
