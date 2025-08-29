import { create } from "zustand";

interface SidebarState {
  states: {
    isSidebarVisible: boolean;
    isSidebarExpanded: boolean;
  };
  actions: {
    setIsSidebarVisible: (
      value: boolean | ((value: boolean) => boolean),
    ) => void;
    setIsSidebarExpanded: (
      value: boolean | ((value: boolean) => boolean),
    ) => void;
  };
}

const useSidebarStore = create<SidebarState>()((set) => ({
  states: {
    isSidebarVisible: false,
    isSidebarExpanded: true,
  },
  actions: {
    setIsSidebarVisible: (value) =>
      set(({ states }) => ({
        states: {
          ...states,
          isSidebarVisible:
            typeof value === "function"
              ? value(states.isSidebarVisible)
              : value,
        },
      })),

    setIsSidebarExpanded: (value) =>
      set(({ states }) => ({
        states: {
          ...states,
          isSidebarExpanded:
            typeof value === "function"
              ? value(states.isSidebarExpanded)
              : value,
        },
      })),
  },
}));

export const useSidebar = () => useSidebarStore((state) => state.states);

export const useSidebarActions = () =>
  useSidebarStore((state) => state.actions);
