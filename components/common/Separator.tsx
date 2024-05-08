import { View } from "react-native";

export default function Separator({ height }: { height: number }) {
  return <View className={`h-${height} `} />;
}
