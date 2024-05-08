import { View, TouchableOpacity, useColorScheme, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import clsx from "clsx";

export default function TopNav({ onPressExport }: { onPressExport: () => void }) {
  const colorScheme = useColorScheme();

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
        onPress={onPressExport}
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
