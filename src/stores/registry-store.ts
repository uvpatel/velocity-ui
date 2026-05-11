"use client";

import { create } from "zustand";

type RegistryViewMode = "grid" | "list";

type RegistryStore = {
  query: string;
  category: string | null;
  tags: string[];
  viewMode: RegistryViewMode;
  setQuery: (query: string) => void;
  setCategory: (category: string | null) => void;
  toggleTag: (tag: string) => void;
  setViewMode: (viewMode: RegistryViewMode) => void;
  reset: () => void;
};

export const useRegistryStore = create<RegistryStore>((set) => ({
  query: "",
  category: null,
  tags: [],
  viewMode: "grid",
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  toggleTag: (tag) =>
    set((state) => ({
      tags: state.tags.includes(tag) ? state.tags.filter((item) => item !== tag) : [...state.tags, tag],
    })),
  setViewMode: (viewMode) => set({ viewMode }),
  reset: () => set({ query: "", category: null, tags: [], viewMode: "grid" }),
}));
