import { ModuleOption } from '../definition'
interface IState {
  aboutDialogVisible: boolean
  value: number
  name: string
}

interface Getters {
  valueAndName1: string
}
interface IMutations {
  updateAboutDialogVisiable: boolean
  setValueAndName1: { value: number; name: string }
}

export type AppModule = ModuleOption<IState, Getters, IMutations>

const mod: AppModule = {
  state: {
    aboutDialogVisible: false,
    value: 0,
    name: '',
  },
  getters: {
    valueAndName1: (state) => state.name + ' ' + state.value,
  },
  mutations: {
    updateAboutDialogVisiable(state, value) {
      state.aboutDialogVisible = value
    },
    setValueAndName1: (state, { name, value }) => {
      state.name = name
      state.value = value
    },
  },
}

export default mod
