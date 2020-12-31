export interface IHubConnection {
  id: string
  isTrying?: boolean
  label?: string
  status?: string
  options?: any
  log: any[]
  keysCount?: number
}
