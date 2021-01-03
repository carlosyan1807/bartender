import { ModuleOption } from '../definition'
import { IHubConnection } from '../interface'

interface IState {
  connections: IHubConnection[]
  activedTab: string
  settingsVisiable: boolean
}

interface Getters {}

interface IMutations {
  showHubSettings: boolean
  updateHubActivedTab: string
  updateConnectionStatus: IHubConnection
  updateConnectionLog: { id: string; content: any }
  updateConnectionKeysCount: { id: string; count: number }
  removeConnection: { id: string }
  removeHubItem: { id: string }
  // createHubItem: IHubConnection
}

export type HubModule = ModuleOption<IState, Getters, IMutations>

const module: HubModule = {
  state: {
    connections: [],
    activedTab: '',
    settingsVisiable: false,
  },
  getters: {},
  mutations: {
    showHubSettings(state, value) {
      state.settingsVisiable = value
      if (value) state.activedTab = 'settings'
    },
    updateHubActivedTab(state, value) {
      state.activedTab = value
    },
    updateConnectionStatus(state, item) {
      const { id, status, options, label, isTrying } = item
      const found = state.connections.findIndex((e) => e.id === id)
      if (found !== -1) {
        state.connections[found].status = status
        if (status === 'ready') {
          state.connections[found].isTrying = false
        }
      } else {
        const _label = label || `${options.host}:${options.port}`
        state.connections.push({ id, status, options, label: _label, isTrying, log: [] })
      }
    },
    updateConnectionLog(state, item) {
      const { id, content } = item
      const found = state.connections.find((e) => e.id === id)
      if (found) {
        found.log.push({ timestamp: new Date().valueOf(), content })
      }
    },
    updateConnectionKeysCount(state, item) {
      const { id, count } = item
      const found = state.connections.find((e) => e.id === id)
      if (found) found.keysCount = count
    },
    removeConnection(state, item) {
      state.connections.splice(
        state.connections.findIndex((e) => e.id === item.id),
        1
      )
    },
    removeHubItem(state, { id }) {
      state.connections = state.connections.filter((e) => e.id !== id)
    },
  },
}

export default module
