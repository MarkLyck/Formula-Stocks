export let hasStorage = false

try {
  localStorage.setItem('mod', 'mod')
  localStorage.removeItem('mod')
  hasStorage = true
} catch (exception) {
  hasStorage = false
}

export const isBrowser = (function () {
  return !!(typeof window !== 'undefined' && window.location)
})()
