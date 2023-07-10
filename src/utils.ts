export const lossFrame = (container, func) => {
  let timer

  let isRendering = false
  let originScrollTop = 0
  let realScrollTop = 500

  return evt => {
    console.log(container.scrollTop)
    if (isRendering) {
      container.scrollTo({ top: originScrollTop })

      return
    }

    isRendering = true
    realScrollTop = container.scrollTop

    // timer = requestAnimationFrame(() => {
    //   sleep(1000)

    //   func?.(realScrollTop)

    //   container.scrollTo({ top: realScrollTop })
    //   setTimeout(() => {
    //     // isRendering = false
    //   }, 10)
    // })
  }
}

export function sleep(ms: number) {
  let t = Date.now()
  while (Date.now() - t < ms) {}
}
