import { ModuleOption } from '../definition'
interface IState {
  aboutDialogVisible: boolean
  siderVisiable: boolean
  activedNavMenuItem: string
  keyDisplayByIcon: boolean
}

interface Getters {}
interface IMutations {
  updateSiderVisiable: boolean
  updateAboutDialogVisiable: boolean
  updateActivedNavMenuItem: string
  updateKeyDisplayByIcon: boolean
}

export type AppModule = ModuleOption<IState, Getters, IMutations>

const mod: AppModule = {
  state: {
    aboutDialogVisible: false,
    siderVisiable: true,
    activedNavMenuItem: 'explorer',
    keyDisplayByIcon: false,
  },
  getters: {},
  mutations: {
    updateKeyDisplayByIcon(state: IState, value: boolean): void {
      state.keyDisplayByIcon = value
    },
    updateActivedNavMenuItem(state: IState, value: string): void {
      state.activedNavMenuItem = value
    },
    updateSiderVisiable(state: IState, value: boolean): void {
      state.siderVisiable = value
    },
    updateAboutDialogVisiable(state: IState, value: boolean): void {
      state.aboutDialogVisible = value
    },
  },
}

export default mod
