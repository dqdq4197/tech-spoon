import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: null | ((event: WindowEventMap[K]) => void),
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void

// Element Event based useEventListener interface
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: null | ((event: HTMLElementEventMap[K]) => void),
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: null | ((event: DocumentEventMap[K]) => void),
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions
): void

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: null | ((event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void),
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef(handler)
  const [trigger, setTrigger] = useState(!!handler)

  useLayoutEffect(() => {
    savedHandler.current = handler
    setTrigger(!!handler)
  }, [handler])

  useEffect(() => {
    if (savedHandler.current === null) {
      return
    }

    const targetElement: T | Window = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    const eventListener: typeof handler = (event) => savedHandler.current?.(event)

    targetElement.addEventListener(eventName, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, options, trigger])
}

export default useEventListener
