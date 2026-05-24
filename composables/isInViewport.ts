export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const scrollY = window.scrollY + offset
  const topPosition = element.offsetTop
  const height = element.offsetHeight

  return scrollY > topPosition && scrollY <= topPosition + height
}
