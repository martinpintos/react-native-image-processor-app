import clsx from "clsx";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity, FlatList, useColorScheme } from "react-native";

type ActionsHistoryProps = {
  history: {
    id: number;
    params: Record<string, string | undefined>;
    thumbnail: string;
  }[];
  onRevert: (id: number) => void;
  baseUrl: string;
};

export default function ActionsHistory({ baseUrl, history, onRevert }: ActionsHistoryProps) {
  const colorScheme = useColorScheme();
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const backgroundColor =
      colorScheme === "dark"
        ? index % 2 === 0
          ? "bg-neutral-800"
          : "bg-neutral-900"
        : index % 2 === 0
        ? "bg-neutral-200"
        : "bg-neutral-300";
    return (
      <TouchableOpacity
        onPress={() => onRevert(item.id)}
        className={`flex-row px-5 py-3 items-center ${backgroundColor}`}
      >
        <Image source={{ uri: baseUrl + item.thumbnail }} className="w-12 h-12 mr-2" />
        <Text
          className={clsx("font-semibold text-base", {
            "text-white": colorScheme === "dark",
            "text-black": colorScheme === "light",
          })}
        >
          Action {item.id}
        </Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: any) => item.id.toString();

  return (
    <View className="flex-1">
      <Text
        className={clsx("font-bold text-xl mb-2 px-5", {
          "text-white": colorScheme === "dark",
          "text-black": colorScheme === "light",
        })}
      >
        Actions History
      </Text>
      <FlatList
        data={history.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={{ flex: 1 }}
        ListEmptyComponent={
          <Text
            className={clsx("text-center mt-5", {
              "text-white": colorScheme === "dark",
              "text-black": colorScheme === "light",
            })}
          >
            No actions have been performed yet
          </Text>
        }
      />
    </View>
  );
}
