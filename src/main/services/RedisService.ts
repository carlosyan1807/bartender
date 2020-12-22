import { Service } from './Service'
import { Logger } from '/@main/logger'

import redis from '../lib/redisClient'
import { app, WebContents } from 'electron'
import IORedis from 'ioredis'
export class RedisService extends Service {
  private clients: any[] = []
  private webContent: WebContents | undefined

  constructor(logger: Logger) {
    super(logger)

    app.once('browser-window-created', (event, window) => {
      this.webContent = window.webContents
    })
  }

  async createConnection(params: any): Promise<any> {
    const { id, options } = params[0]
    const client = await redis.createStandAloneConnection(options)

    client.on('ready', () => {
      this.webContent?.send('clientStatusUpdated', { id: id, status: 'ready' })
    })

    this.clients.push({ id, client })

    return new Promise((resolve) => {
      resolve(true)
    })
  }
  private whichClient(id: string): IORedis.Redis | undefined {
    const found = this.clients.find((e) => e.id === id)
    if (found) {
      return found.client
    }
    return
  }

  scanKeys(params: any): Promise<any[][]> {
    const { id } = params[0]
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
      } else {
        // TODO: client 不存在时返回错误
        reject('client 不存在的错误')
      }
    })
  }
}
