import { vi } from 'vitest'

/** Ersetzt requestAnimationFrame durch eine Warteschlange, die der Test selbst abarbeitet. */
export function stubAnimationFrames() {
  let queue: { id: number; cb: FrameRequestCallback }[] = []
  let next = 1
  const cancelled: number[] = []
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    queue.push({ id: next, cb })
    return next++
  })
  vi.stubGlobal('cancelAnimationFrame', (id: number) => {
    cancelled.push(id)
    queue = queue.filter((item) => item.id !== id)
  })
  return {
    pending: () => queue.length,
    cancelled,
    /** Führt die aktuell wartenden Frames genau einmal aus. */
    flush() {
      const current = queue
      queue = []
      current.forEach((item) => item.cb(0))
    }
  }
}
