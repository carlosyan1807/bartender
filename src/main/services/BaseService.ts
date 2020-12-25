import { app } from 'electron'
import os from 'os'
import { Service } from './Service'

export class BaseService extends Service {
  async getBasicInformation() {
    this.log('getBasicInformation is called!')
    const result = {
      os: {
        type: os.type(),
        arch: os.arch(),
        release: os.release(),
      },
      electron: app.getVersion(),
      root: app.getPath('userData'),
      chrome: process.versions.chrome,
      nodejs: {
        platform: os.platform(),
        version: process.version,
      },
    }
    return result
  }
}
