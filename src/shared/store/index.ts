/* eslint-disable no-unused-vars */
import { StoreOptions, createLogger } from 'vuex'
import { BaseGetters, BaseMutations, BaseState, RootState } from './definition'
import app, { AppModule } from './modules/app'
import bar, { BarModule } from './modules/bar'
import foo, { FooModule } from './modules/foo'
import hub, { HubModule } from './modules/hub'

declare module './definition' {
  interface ModuleMap {
    foo: FooModule
    bar: BarModule
    app: AppModule
    hub: HubModule
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
    hub,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
}

export default (store as any) as StoreOptions<RootState>
