import { create } from "zustand";

type ImageState = {
  baseUrl: string;
  params: Record<string, string | undefined>;
  history: { id: number; params: Record<string, string | undefined>; thumbnail: string }[];
  updateParams: (params: Record<string, string | undefined>) => void;
  revertToHistory: (id: number) => void;
  resetState: () => void;
};

const defaultParams = {
  auto: "compress",
  fit: "crop",
  h: "384",
  w: "430",
  // bri: "0",
  // con: "0",
  // exp: "0",
  // gam: "0",
};

export const useImageStore = create<ImageState>((set, get) => ({
  baseUrl: "",
  params: defaultParams,
  history: [],
  updateParams: (newParams) => {
    set((state) => {
      const mergedParams = { ...state.params };
      Object.keys(newParams).forEach((key) => {
        if (newParams[key] === undefined) {
          delete mergedParams[key];
        } else {
          mergedParams[key] = newParams[key];
        }
      });

      const queryString = Object.entries(mergedParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join("&");

      const thumbnailUrl = `${get().baseUrl}?${queryString}`;

      const currentInteractionIndex = state.history.findIndex(
        (item) => JSON.stringify(item.params) === JSON.stringify(state.params)
      );
      const newHistory =
        currentInteractionIndex !== -1
          ? state.history.slice(0, currentInteractionIndex + 1)
          : state.history;

      if (JSON.stringify(state.params) !== JSON.stringify(mergedParams)) {
        newHistory.push({
          id: newHistory.length + 1,
          params: mergedParams,
          thumbnail: thumbnailUrl,
        });
      }

      return {
        params: mergedParams,
        history: newHistory,
      };
    });
  },
  revertToHistory: (id) => {
    set((state) => {
      const historyIndex = state.history.findIndex((item) => item.id === id);
      if (historyIndex !== -1) {
        const historyItem = state.history[historyIndex];
        return { ...state, params: historyItem.params };
      }
      return state;
    });
  },
  resetState: () => {
    set(() => ({
      params: defaultParams,
      history: [],
    }));
  },
}));
