import * as core from '@actions/core'

import {DownloadMinikube, StartMinikube} from './minikube'

async function run(): Promise<void> {
  const binPath = '/home/runner/bin'
  try {
    if (core.getInput('use-cache') === 'true') {
      core.addPath(binPath)
    } else {
      await DownloadMinikube(core.getInput('minikube-version'))
    }
    await StartMinikube(core.getInput('kubernetes-version'))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
