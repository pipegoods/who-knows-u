declare module 'virtual:pwa-register' {
  type RegisterSWOptions = {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }

  export function registerSW(options?: RegisterSWOptions): () => Promise<void>

  export default registerSW
}
// Type declarations for virtual module provided by vite-plugin-pwa
declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }): () => void
}
