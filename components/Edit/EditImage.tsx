import { View, Text } from "react-native";
import React from "react";
import { Image as ExpoImage } from "expo-image";

export default function EditImage({ currentUrl }: { currentUrl: string }) {
  return (
    <View className="w-full h-96 items-center justify-center">
      <ExpoImage
        source={{ uri: currentUrl as string }}
        className="h-full w-full"
        contentFit="contain"
        transition={500}
      />
    </View>
  );
}
