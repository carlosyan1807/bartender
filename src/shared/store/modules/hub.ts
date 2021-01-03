import { ModuleOption } from '../definition'

interface IHubConnection {
  id: string
  isTrying?: boolean
  label?: string
  status?: string
  options?: any
  log: any[]
  keysCount?: number
  cursorPosition?: { column: number; lineNumber: number }
}

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
  updateConnectionEditorCursorPosition: {
    id: string
    cursorPosition: { column: number; lineNumber: number }
  }
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
    updateConnectionEditorCursorPosition(state, item) {
      const { id, cursorPosition } = item
      const { column, lineNumber } = cursorPosition
      const found = state.connections.find((e) => e.id === id)
      if (found) found.cursorPosition = { column, lineNumber }
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
