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
      v8: process.versions.v8,
      // electron: app.getVersion(),
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      nodejs: process.version,
      app: app.getVersion(),
      root: app.getPath('userData'),
    }
    return result
  }
}
