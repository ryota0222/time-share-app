import { create } from "zustand";

export interface Event {
  type:
    | "start"
    | "stop"
    | "reset"
    | "user_leave"
    | "user_join"
    | "space_delete";
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
  setSpace: (obj: Space | null) => void;
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
