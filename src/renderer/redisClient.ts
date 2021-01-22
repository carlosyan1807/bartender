// import { v4 as uuidv4 } from 'uuid'
import IORedis from 'ioredis'

const RedisClient = new IORedis()
// const RedisClient = {
//   createStandAloneConnection(options: IORedis.RedisOptions): IORedis.Redis {
//     const _options = Object.assign({}, options, {
//       retryStrategy(attempts: number) {
//         if (attempts < 3) return 100
//       },
//     })
//     const id = uuidv4()
//     const client = new IORedis(_options)

//     client.on('ready', () => {
//       console.log('onReady', id)
//     })

//     client.on('error', (e) => {
//       console.log('onError', e.message)
//     })
//     client.on('connect', () => {
//       // this.webContent?.send('connectionStatusUpdated', { id, status: 'connect' })
//       console.log('onConnect', id)
//     })
//     client.on('close', () => {
//       console.log('onClose', id)
//     })
//     client.on('end', () => {
//       console.log('onEnd', id)
//     })
//     client.on('reconnecting', (delay) => {
//       console.log('onReconnecting', delay, id)
//     })
//     client.on('select', (dbIndex) => {
//       // if (this.clients.findIndex((e) => e.id === id) !== -1)
//       //   this.webContent?.send('connectionLogUpdated', { id, content: e })
//       console.log('onSelect', dbIndex)
//     })
//     return client
//   },
//   createConnection(options: IORedis.RedisOptions = {}): IORedis.Redis {
//     return this.createStandAloneConnection(options)
//   },
// }
export default RedisClient

// export default class RedisClient extends IORedis {
//   constructor(options: IORedis.RedisOptions = {}, public readonly name?: string) {
//     super(options)
//     this.handleConnect = this.handleConnect.bind(this)
//     this.handleReady = this.handleReady.bind(this)
//     this.handleError = this.handleError.bind(this)
//     this.handleClose = this.handleClose.bind(this)
//     this.handleReconnecting = this.handleReconnecting.bind(this)
//     this.handleEnd = this.handleEnd.bind(this)
//     this.handleMessage = this.handleMessage.bind(this)
//   }

//   protected _initialised = false
//   public async init(): Promise<void> {
//     if (this._initialised) throw new Error('InitialisationException()')
//     console.log(`initialising ${this.constructor.name}::${this.name}...`)
//     this._initialised = true
//     await this._up()
//   }

//   /**
//    * De-initialise the service
//    */
//   public async deInit(): Promise<void> {
//     if (!this._initialised) throw new Error('InitialisationException()')
//     console.log(`de-initialising ${this.constructor.name}::${this.name}...`)
//     this._initialised = false
//     await this._down()
//   }

//   protected async _up(): Promise<void> {
//     this.on('connect', this.handleConnect)
//       .on('ready', this.handleReady)
//       .on('error', this.handleError)
//       .on('close', this.handleClose)
//       .on('reconnecting', this.handleReconnecting)
//       .on('end', this.handleEnd)
//       .on('message', this.handleMessage)
//       .on('replyerror', (e) => console.log(e))
//   }
//   protected async _down(): Promise<void> {
//     this.off('connect', this.handleConnect)
//       .off('ready', this.handleReady)
//       .off('error', this.handleError)
//       .off('close', this.handleClose)
//       .off('reconnecting', this.handleReconnecting)
//       .off('end', this.handleEnd)
//       .off('message', this.handleMessage)
//   }
//   protected handleConnect(): void {
//     console.log(`${this.constructor.name}::${this.name}::handleConnect`)
//   }
//   protected handleReady(): void {
//     console.log(`${this.constructor.name}::${this.name}::handleReady`)
//   }
//   protected handleError(error: Error): void {
//     console.log(`[${this.constructor.name}::${this.name}::handleError] ${error}`)
//   }
//   protected handleClose(): void {
//     console.log(`${this.constructor.name}::${this.name}::handleClose`)
//   }
//   protected handleReconnecting(): void {
//     console.log(`${this.constructor.name}::${this.name}::handleReconnecting`)
//   }
//   protected handleEnd(): void {
//     console.log(`${this.constructor.name}::${this.name}::handleEnd`)
//   }
//   protected handleMessage(channel: string, message: string): void {
//     console.log(
//       `[${this.constructor.name}::${this.name}::handleMessage] channel: "${channel}", message: "${message}"`
//     )
//   }
// }
