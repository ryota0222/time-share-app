import { create } from "zustand";

export interface Event {
  type: "start" | "stop" | "pause" | "resume" | "reset";
  createdAt: string;
  user: string;
}

export interface Space {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: string | null;
  members: string[];
  owner: string;
  events: Event[];
}

type State = {
  space: Space | null;
  username: string;
};

type Action = {
  setSpace: (obj: Space) => void;
  setUsername: (name: string) => void;
};

export const useStore = create<State & Action>()((set) => ({
  space: null,
  setSpace: (obj) =>
    set((state) => ({
      ...state,
      space: obj,
    })),
  username: "",
  setUsername: (name) =>
    set((state) => ({
      ...state,
      username: name,
    })),
}));
