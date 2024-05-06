import { create } from "zustand";

type GalleryStore = {
  gallery: {
    url: string;
    name: string;
  }[];
  setGallery: (gallery: GalleryStore["gallery"]) => void;
};

const useGalleryStore = create<GalleryStore>((set) => ({
  gallery: [],
  setGallery: (gallery) => set({ gallery }),
}));
