import { hasStorage } from '~/common/utils/featureTests'
import { atom } from 'jotai'
import themes, { themeNameType } from 'src/lib/themes'

// @ts-ignore
let DEFAULT_THEME_TYPE: themeNameType = 'light'
if (hasStorage) {
  // @ts-ignore
  DEFAULT_THEME_TYPE = localStorage.getItem('theme_type') || 'light'
}

export const themeAtom = atom(themes[DEFAULT_THEME_TYPE], (_, set, arg: themeNameType) => {
  if (hasStorage) localStorage?.setItem('theme_type', arg)
  set(themeAtom, themes[arg])
})
