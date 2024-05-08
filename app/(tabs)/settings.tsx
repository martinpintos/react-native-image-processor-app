import React, { useState } from "react";
import { Text, View, Switch, Appearance } from "react-native";

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === "dark");

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      Appearance.setColorScheme(newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <View className="flex-1 items-center justify-center  dark:bg-black">
      <Text className={`${isDarkMode ? "text-white" : "text-black"} text-lg font-bold mb-4`}>
        Settings
      </Text>
      <View className="flex-row items-center">
        <Text className={`${isDarkMode ? "text-white" : "text-black"} text-lg mr-2`}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? "#ffffff" : "#000000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
}
