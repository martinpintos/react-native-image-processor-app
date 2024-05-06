import { FlatList, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { useState } from "react";
import { useGalleryStore } from "@/store/useGalleryStore";
import { Image } from "expo-image";

export default function GalleryScreen() {
  const { gallery, fetchGallery, isLoading } = useGalleryStore();

  useState(() => {
    fetchGallery();
    // @ts-ignore
  }, []);

  const renderItem = ({ item, index }: any) => {
    const isLastItem = index === gallery.length - 1;
    const isEvenRow = (index + 1) % 2 === 0;
    return (
      <TouchableOpacity
        className={clsx(
          "flex-1 h-64 items-center justify-center border border-black",
          !isEvenRow && isLastItem && "max-w-[50%]"
        )}
      >
        <Image
          transition={1000}
          contentFit="cover"
          source={{ uri: item.url }}
          className="w-full h-full"
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={gallery}
      keyExtractor={(item) => item.name.toString()}
      renderItem={renderItem}
    />
  );
}
