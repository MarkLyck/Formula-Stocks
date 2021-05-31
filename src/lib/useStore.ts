import create from 'zustand'

const useStore: any = create((set) => ({
  user: null,
  setUser: (user: any) => set(() => ({ user })),
  plan: 'entry',
  setPlan: (plan: any) => set(() => ({ plan })),
}))

export default useStore
