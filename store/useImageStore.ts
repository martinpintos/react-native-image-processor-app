import { create } from "zustand";

type ImageState = {
  params: Record<string, string>;
  history: string[];
  updateParams: (params: Record<string, string>) => void;
  currentUrl: string;
  revertToHistory: () => void;
};

const defaultParams = {
  fit: "crop",
  h: "600",
  w: "900",
  auto: "compress",
};

const createUrlWithParams = (baseUrl: string, params: Record<string, string>) => {
  return `${baseUrl}?${Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&")}`;
};

export const useImageStore = (baseUrl: string) =>
  create<ImageState>((set) => ({
    params: defaultParams,
    history: [createUrlWithParams(baseUrl, defaultParams)],
    updateParams: (newParams) =>
      set((state) => {
        const mergedParams = { ...state.params, ...newParams };
        const newUrl = createUrlWithParams(baseUrl, mergedParams);
        return {
          params: mergedParams,
          history: [...state.history, newUrl],
          currentUrl: newUrl,
        };
      }),
    revertToHistory: () =>
      set((state) => {
        const newHistory = state.history.slice(0, -1);
        const newUrl = newHistory[newHistory.length - 1] || baseUrl;
        const params = newUrl
          .split("?")[1]
          .split("&")
          .reduce<Record<string, string>>((acc, param) => {
            const [key, value] = param.split("=");
            acc[key] = decodeURIComponent(value);
            return acc;
          }, {});
        return {
          params,
          history: newHistory,
          currentUrl: newUrl,
        };
      }),
    currentUrl: createUrlWithParams(baseUrl, defaultParams),
  }));
