import { create } from "zustand";
import axios from "axios";

type GalleryState = {
  isLoading: boolean;
  gallery: {
    url: string;
    name: string;
  }[];
  fetchGallery: () => void;
};

export const useGalleryStore = create<GalleryState>()((set) => ({
  gallery: [],
  isLoading: true,
  fetchGallery: async () => {
    try {
      const { data } = await axios.get(process.env.EXPO_PUBLIC_API_URL ?? "");

      const filteredData = data.filter(
        (item: { url: string; name: string }) => item.name !== "imgix-logo-ani.gif"
      );

      set({ gallery: filteredData, isLoading: false });
    } catch (error) {
      console.error("Error fetching gallery", error);
      set({ isLoading: false });
    }
  },
}));
