"use client"

import { create } from "zustand"

interface SearchStore {
  searchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  searchOpen: false,
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
}))
