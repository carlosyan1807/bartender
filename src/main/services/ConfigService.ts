import { Service } from './Service'
import { Logger } from '/@main/logger'
import Store from 'electron-store'

const defaultConfig = {
  keyDisplayByIcon: true,
}

export class ConfigService extends Service {
  private store: Store

  constructor(logger: Logger) {
    super(logger)
    this.store = new Store()
  }

  // getConfig() {
  //   const config = {
  //     keyDisplayByIcon: this.getKeyDisplayByIcon(),
  //   }
  //   return config
  // }
  getKeyDisplayByIcon(): boolean {
    return this.store.get('keyDisplayByIcon', defaultConfig.keyDisplayByIcon) as boolean
  }

  setConfig(key: string, value: unknown): void {
    this.store.set(key, value)
  }
}
