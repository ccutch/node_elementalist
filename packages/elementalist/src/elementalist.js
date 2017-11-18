import { initDockerSwarm, startDockerRegistry } from './docker'

// submodules
import * as elements from './elements'
export { elements }

export async function bootstrap() {
  try {
    await initDockerSwarm()
  } catch (error) {
    console.log(error.exitStatus, error.stderr.toString('utf-8'))
    // Load existing services as elements
    // Or require SWARM_HOST environment variable
  }

  try {
    await startDockerRegistry()
  } catch (error) {
    console.log('registry already running')
  }
}
