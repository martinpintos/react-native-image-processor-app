import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import React from "react";
import clsx from "clsx";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";

export default function URLDisplay({ currentUrl }: { currentUrl: string }) {
  const colorScheme = useColorScheme();

  const handlePress = async (currentUrl: string) => {
    await Clipboard.setStringAsync(currentUrl);
  };

  return (
    <View className="px-5">
      <TouchableOpacity
        className={clsx(
          "w-full px-3 rounded-xl py-3 flex-row justify-between items-center space-x-3",

          colorScheme === "dark" && "bg-neutral-800",
          colorScheme === "light" && "bg-zinc-300"
        )}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 1,
        }}
        onPress={() => handlePress(currentUrl)}
      >
        <Text
          className={clsx(
            "text-sm flex-1",
            colorScheme === "dark" && "text-white",
            colorScheme === "light" && "text-black"
          )}
        >
          {currentUrl ?? ""}
        </Text>
        <Feather name="copy" size={20} color={colorScheme === "dark" ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
}
