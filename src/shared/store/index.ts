/* eslint-disable no-unused-vars */
import { StoreOptions } from 'vuex'
import { BaseGetters, BaseMutations, BaseState, RootState } from './definition'
import app, { AppModule } from './modules/app'
import bar, { BarModule } from './modules/bar'
import foo, { FooModule } from './modules/foo'

declare module './definition' {
  interface ModuleMap {
    foo: FooModule
    bar: BarModule
    app: AppModule
  }

  interface BaseState {
    // define base state here
  }
  interface BaseMutations {
    // define base mutations here
  }
}

const state: BaseState = {}
const getters: BaseGetters = {}
const mutations: BaseMutations = {}

const store = {
  state,
  getters,
  mutations,
  modules: {
    app,
    foo,
    bar,
  },
}

export default (store as any) as StoreOptions<RootState>
