import { stat } from 'fs-extra'
import { ModuleOption } from '../definition'
interface IState {
  aboutDialogVisible: boolean
  siderVisiable: boolean
  activedNavMenuItem: string
}

interface Getters {}
interface IMutations {
  updateSiderVisiable: boolean
  updateAboutDialogVisiable: boolean
  updateActivedNavMenuItem: string
}

export type AppModule = ModuleOption<IState, Getters, IMutations>

const mod: AppModule = {
  state: {
    aboutDialogVisible: false,
    siderVisiable: true,
    activedNavMenuItem: 'explorer',
  },
  getters: {},
  mutations: {
    updateActivedNavMenuItem(state, value) {
      state.activedNavMenuItem = value
    },
    updateSiderVisiable(state, value) {
      state.siderVisiable = value
    },
    updateAboutDialogVisiable(state, value) {
      state.aboutDialogVisible = value
    },
  },
}

export default mod
