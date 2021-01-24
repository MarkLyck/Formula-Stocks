export const resetApplication = () => {
  // clear storage
  localStorage.clear()
  sessionStorage.clear()
  // reload website
  location.reload(true)
}
