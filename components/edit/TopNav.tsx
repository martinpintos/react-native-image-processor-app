import { View, TouchableOpacity, useColorScheme, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import clsx from "clsx";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function TopNav({ currentUrl }: { currentUrl: string }) {
  const colorScheme = useColorScheme();

  const downloadImage = async (uri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const fileUri = FileSystem.cacheDirectory + "image.jpg";
    await FileSystem.downloadAsync(uri, fileUri)
      .then(async ({ uri }) => {
        await MediaLibrary.saveToLibraryAsync(uri);
        alert("Image saved to gallery!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View className="flex-row justify-between h-14 items-center w-full px-5">
      <Link href="/(tabs)" asChild>
        <TouchableOpacity className="h-full items-start justify-center w-12 overflow-hidden">
          <Ionicons
            name="arrow-back-outline"
            style={{
              marginLeft: -2,
            }}
            color={colorScheme === "dark" ? "white" : "black"}
            size={32}
          />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={() => downloadImage(currentUrl)}
        className="h-full justify-center pl-2 items-end rounded-sm"
      >
        <Text
          className={clsx("text-lg font-semibold text-right", {
            "text-white": colorScheme === "dark",
            "text-black": colorScheme === "light",
          })}
        >
          Export
        </Text>
      </TouchableOpacity>
    </View>
  );
}
