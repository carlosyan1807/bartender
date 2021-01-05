import { Service } from './Service'
import { Logger } from '/@main/logger'
// import redis from '../lib/redisClient'
import { app, WebContents } from 'electron'
import IORedis, { RedisOptions } from 'ioredis'
import { v4 as uuidv4 } from 'uuid'

export class RedisService extends Service {
  private clients: { id: string; client: IORedis.Redis }[] = []
  private webContent!: WebContents

  constructor(logger: Logger) {
    super(logger)

    app.once('browser-window-created', (event, window) => {
      this.webContent = window.webContents
    })
  }

  private whichClient(id: string): Promise<IORedis.Redis> {
    const found = this.clients.find((e) => e.id === id)
    if (found) {
      return Promise.resolve(found.client)
    }
    return Promise.reject('client not found.')
  }

  private createStandAloneConnection(options: RedisOptions): string {
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
    return id
  }

  createConnection(options: RedisOptions): string {
    return this.createStandAloneConnection(options)
  }

  async dropConnection(id: string): Promise<boolean> {
    const client = await this.whichClient(id)
    this.listConnections()
    this.clients.splice(
      this.clients.findIndex((e) => e.id === id),
      1
    )
    this.listConnections()
    if (client) {
      client.disconnect()
      client.quit()
    }
    return true
  }

  listConnections() {
    this.log(
      this.clients.length,
      this.clients.map((e) => e.id)
    )
  }

  async getConfig(id: string, name: string): Promise<string[]> {
    const client = await this.whichClient(id)
    return client.config('GET', name)
  }

  async changeDb(id: string, db: number): Promise<'OK'> {
    const client = await this.whichClient(id)
    return client.select(db)
  }

  async getStringKey(id: string, name: string): Promise<string | null> {
    const client = await this.whichClient(id)
    return client.get(name)
  }
  async getHashKey(id: string, name: string): Promise<[string, string[][]]> {
    const client = await this.whichClient(id)
    const result: string[][] = []
    const [cursor, res] = await client.hscan(name, 0)
    if (res.length) {
      for (let i = 0; i < res.length - 1; i += 2) {
        result.push([res[i].toString(), res[i + 1]])
      }
    }
    return Promise.resolve([cursor, result])
  }
  async getListKey(id: string, name: string): Promise<string[]> {
    const client = await this.whichClient(id)
    const result = await client.lrange(name, 0, 100)
    return Promise.resolve(result)
  }

  async scanKeys(id: string): Promise<[string, string[][]]> {
    const client = await this.whichClient(id)
    const pattern = '*'
    const fetchCount = 100
    let result: string[][] = []
    const [cursor, res] = await client.scan(0, 'MATCH', pattern, 'COUNT', fetchCount)
    if (res.length) {
      const pipeline = client.pipeline()
      res.forEach((key) => pipeline.type(key))
      const [...typesRes] = await pipeline.exec()
      // FIXME: pipeline.exec 未捕获异常
      result = res.map((e, i) => [e, typesRes[i][1]])
    }
    return Promise.resolve([cursor, result])
  }
}
