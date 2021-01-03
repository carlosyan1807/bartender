import { Service } from './Service'
import { Logger } from '/@main/logger'
// import redis from '../lib/redisClient'
import { app, WebContents } from 'electron'
import IORedis, { RedisOptions } from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
export class RedisService extends Service {
  private clients: any[] = []
  private webContent!: WebContents

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

  createStandAloneConnection(options: RedisOptions): Promise<any> {
    const _options = Object.assign({}, options, {
      retryStrategy(attempts: number) {
        if (attempts < 3) return 100
      },
    })
    const id = uuidv4()
    const client = new IORedis(_options)
    const newClient = { id, client }
    this.webContent?.send('trying2Connect', { id, options })
    this.clients.push(newClient)

    client.on('ready', () => {
      this.log('onReady', id)
      this.webContent?.send('connectionStatusUpdated', { id, status: 'ready' })
    })

    client.on('error', (e) => {
      this.error('onError', e.message)
      this.webContent?.send('connectionLogUpdated', { id, content: e })
    })
    client.on('connect', () => {
      // this.webContent?.send('connectionStatusUpdated', { id, status: 'connect' })
      this.log('onConnect', id)
    })
    client.on('close', () => {
      this.log('onClose', id)
    })
    client.on('end', () => {
      this.log('onEnd', id)
      if (this.clients.findIndex((e) => e.id === id) !== -1)
        this.webContent?.send('connectionStatusUpdated', { id, status: 'end' })
    })
    client.on('reconnecting', (delay) => {
      this.log('onReconnecting', delay, id)
    })
    client.on('select', (dbIndex) => {
      // if (this.clients.findIndex((e) => e.id === id) !== -1)
      //   this.webContent?.send('connectionLogUpdated', { id, content: e })
      this.log('onSelect', dbIndex)
    })
    return new Promise((resolve) => {
      resolve(id)
    })
  }
  createConnection(options: RedisOptions): Promise<any> {
    return this.createStandAloneConnection(options)
  }
  async dropConnection(id: string) {
    const client = this.whichClient(id)
    this.listConnections()
    this.clients.splice(
      this.clients.findIndex((e) => e.id === id),
      1
    )
    this.listConnections()
    if (client) {
      client.disconnect()
      await client.quit()
    }
  }
  listConnections() {
    this.log(
      this.clients.length,
      this.clients.map((e) => e.id)
    )
  }
  getConfig(id: string, name: string): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      const client = this.whichClient(id)
      if (client) {
        const res = await client.config('GET', name)
        resolve(res)
      }
    })
  }
  changeDb(id: string, db: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const client = this.whichClient(id)
      if (client) {
        const res = await client.select(db)
        if (res === 'OK') resolve(true)
        reject('错误')
      }
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
