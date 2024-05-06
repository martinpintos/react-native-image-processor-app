import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import React from "react";
import clsx from "clsx";

export default function URLDisplay({ currentUrl }: { currentUrl: string }) {
  const colorScheme = useColorScheme();

  const handlePress = (currentUrl: string) => {
    // TODO: Copy to clipboard
    console.log("Copy to clipboard", currentUrl);
  };

  return (
    <View className="px-4 py-3 ">
      <TouchableOpacity
        className={clsx(
          "w-full px-3 rounded-lg py-3",

          colorScheme === "dark" && "bg-neutral-700",
          colorScheme === "light" && "bg-neutral-300"
        )}
        onPress={() => handlePress(currentUrl)}
      >
        <Text
          className={clsx(
            "text-sm",
            colorScheme === "dark" && "text-white",
            colorScheme === "light" && "text-black"
          )}
        >
          {currentUrl ?? ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
