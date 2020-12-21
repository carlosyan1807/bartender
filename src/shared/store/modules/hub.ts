import { ModuleOption } from '../definition'
import { IHubConnection } from '../interface'

interface IState {
  connections: IHubConnection[]
  activedTab: string
  tempActived: boolean
  settingsVisiable: boolean
}

interface Getters {}

interface IMutations {
  showHubSettings: boolean
  updateHubActivedTab: string
  removeHubItem: { id: string }
  createHubItem: IHubConnection
}

export type HubModule = ModuleOption<IState, Getters, IMutations>

const module: HubModule = {
  state: {
    connections: [],
    activedTab: '',
    tempActived: false,
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
    createHubItem(state, item) {
      state.connections.push(item)
    },
    removeHubItem(state, { id }) {
      state.connections = state.connections.filter((e) => e.id !== id)
    },
  },
}

export default module
