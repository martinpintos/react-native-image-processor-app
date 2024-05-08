import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import clsx from "clsx";

type OperationsRowProps = {
  onPressAdjustment: () => void;
  onPressRotation: () => void;
  onPressReset: () => void;
};

const Button = ({
  title,
  onPress,
  icon,
}: {
  title: string;
  icon: "sliders" | "rotate-ccw" | "crop";
  onPress: () => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      className={clsx("rounded-lg space-y-1 w-20 h-16 items-center justify-center", {
        "bg-zinc-200": colorScheme === "light",
        "bg-neutral-800": colorScheme === "dark",
      })}
      onPress={onPress}
    >
      <Feather name={icon} size={24} color={colorScheme === "dark" ? "white" : "black"} />
      <Text className={clsx("text-sm", colorScheme === "dark" ? "text-white" : "text-black")}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default function OperationsRow({
  onPressAdjustment,
  onPressRotation,
  onPressReset,
}: OperationsRowProps) {
  return (
    <View className="flex-row justify-center space-x-4 px-5">
      <View>
        <Button title="Rotate" icon="crop" onPress={onPressRotation} />
      </View>

      <View>
        <Button title="Adjust" icon="sliders" onPress={onPressAdjustment} />
      </View>

      <View>
        <Button title="Reset" icon="rotate-ccw" onPress={onPressReset} />
      </View>
    </View>
  );
}
