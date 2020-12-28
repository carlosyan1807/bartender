import { Service } from './Service'
import { Logger } from '/@main/logger'

// import redis from '../lib/redisClient'
import { app, WebContents } from 'electron'
import IORedis, { RedisOptions } from 'ioredis'
export class RedisService extends Service {
  private clients: any[] = []
  private webContent: WebContents | undefined

  constructor(logger: Logger) {
    super(logger)

    app.once('browser-window-created', (event, window) => {
      this.webContent = window.webContents
    })
  }

  private whichClient(id: string): IORedis.Redis | undefined {
    const found = this.clients.find((e) => e.id === id)
    if (found) {
      return found.client
    }
    return
  }

  createStandAloneConnection(id: string, options: RedisOptions): Promise<any> {
    // const { id, options } = params
    const client = new IORedis(options)

    client.on('ready', () => {
      this.webContent?.send('connectionStatusUpdated', { id: id, status: 'ready' })
    })

    this.clients.push({ id, client })
    return new Promise((resolve) => {
      resolve({ result: true, count: this.clients.length })
    })
  }

  getConfig(id: string, name: string): Promise<string[]> {
    console.log('🚀 / RedisService / getConfig /', id, name)
    return new Promise(async (resolve, reject) => {
      const client = this.whichClient(id)
      if (client) {
        const res = await client.config('GET', name)
        resolve(res)
      }
      reject('错误')
    })
  }
  getStringKey(id: string, name: string): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      const client = this.whichClient(id)
      if (client) {
        const res = await client.get(name)
        resolve(res)
      }
      reject('client 不存在的错误')
    })
  }

  scanKeys(id: string): Promise<any[][]> {
    let pattern = '*',
      fetchCount = 100
    const client = this.whichClient(id)
    let result: any[][]
    return new Promise(async (resolve, reject) => {
      if (client) {
        const [cursor, res] = await client.scan(0, 'MATCH', pattern, 'COUNT', fetchCount)
        if (res.length) {
          const pipeline = client.pipeline()
          res.forEach((key) => pipeline.type(key))
          const [...typesRes] = await pipeline.exec()
          // FIXME: pipeline.exec 未捕获异常
          result = res.map((e, i) => [e, typesRes[i][1]])
        }
        resolve(result)
      }
      // TODO: client 不存在时的错误处理
      reject('client 不存在的错误')
    })
  }
}
