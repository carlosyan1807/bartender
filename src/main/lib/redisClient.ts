import IORedis from 'ioredis'

const client = {
  createStandAloneConnection(options: any): Promise<IORedis.Redis> {
    const client = new IORedis(options)

    // client.on('ready', () => {
    //   console.log('ready')
    // })

    return new Promise((reslove, reject) => {
      reslove(client)
    })
  },
}

export default client
