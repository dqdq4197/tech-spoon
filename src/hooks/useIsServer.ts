import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * SSR 환경이나 client hydration 환경에서 실행될 때 `true`를 반환
 * @see {@link https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store}
 *
 */
function useIsServer() {
  return useSyncExternalStore(
    emptySubscribe,
    // client snapshot
    () => false,
    // server & hydration snapshot
    () => true
  )
}

export default useIsServer
