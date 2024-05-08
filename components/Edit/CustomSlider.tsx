import React from "react";
import Slider from "@react-native-community/slider";
import { Text, View, useColorScheme } from "react-native";
import clsx from "clsx";

export default function CustomSlider({
  step,
  minimumValue,
  maximumValue,
  value,
  title,
  onSlidingComplete,
}: {
  step: number;
  minimumValue: number;
  maximumValue: number;
  value: number;
  title: string;
  onSlidingComplete: (value: number) => void;
}) {
  const colorScheme = useColorScheme();
  return (
    <View className="space-y-1">
      <Text
        className={clsx("text-lg font-semibold ", {
          "text-white": colorScheme === "dark",
          "text-black": colorScheme === "light",
        })}
      >
        {title ?? "Title"}
      </Text>
      <Slider
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={value}
        step={step}
        onSlidingComplete={onSlidingComplete}
        className="w-full h-10"
      />
    </View>
  );
}
