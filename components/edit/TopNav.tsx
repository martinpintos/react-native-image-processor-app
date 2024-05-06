import { View, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TopNav() {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-row justify-between h-12 items-center w-full px-4">
      <Link href="/(tabs)" asChild>
        <TouchableOpacity className="h-full items-start justify-center w-10 -ml-2">
          <Ionicons
            name="chevron-back"
            color={colorScheme === "dark" ? "white" : "black"}
            size={32}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
