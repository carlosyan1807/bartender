/* eslint-disable no-unused-vars */

// declare module '*.vue' {
//   import { Component } from 'vue'
//   const component: Component
//   export default component
// }

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const React: string
declare module '*.json'
declare module '*.png'
declare module '*.jpg'
