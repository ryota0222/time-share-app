import { create } from "zustand";

interface Event {
  type: "start" | "stop" | "pause" | "resume" | "reset";
  timestamp: string;
}

interface Space {
  id: string;
  name: string;
  members: string[];
  owner: string;
  events: Event[];
}

type State = {
  space: Space | null;
};

type Action = {
  setSpace: (obj: Space) => void;
};

export const useStore = create<State & Action>()((set) => ({
  space: {
    id: "1lkspd021",
    name: "taroのスペース",
    members: ["taro", "jiro"],
    owner: "taro",
    events: [
      {
        type: "start",
        timestamp: "2024-04-01T12:00:00Z",
      },
    ],
  },
  setSpace: (obj) =>
    set((state) => ({
      ...state,
      space: obj,
    })),
}));
