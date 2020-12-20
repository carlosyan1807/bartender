import { ModuleOption } from '../definition'

interface State {
  value: number;
  name: string;
}

interface Getters {
  valueAndName1: string
}

interface Mutations {
  setValueAndName1: { value: number; name: string }
}

export type AppModule = ModuleOption<State, Getters, Mutations>;

const mod: AppModule = {
  state: {
    value: 0,
    name: ''
  },
  getters: {
    valueAndName1: state => state.name + ' ' + state.value
  },
  mutations: {
    setValueAndName1: (state, { name, value }) => { state.name = name; state.value = value }
  }
}

export default mod
