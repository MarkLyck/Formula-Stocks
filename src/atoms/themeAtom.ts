import { atom } from 'jotai'
import themes, { themeNameType } from 'src/lib/themes'

// @ts-ignore
const DEFAULT_THEME_TYPE: themeNameType =
    localStorage.getItem('theme_type') || 'light'

export const themeAtom = atom(
    themes[DEFAULT_THEME_TYPE],
    (_, set, arg: themeNameType) => {
        localStorage.setItem('theme_type', arg)
        set(themeAtom, themes[arg])
    }
)
