import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "@/components/edit/TopNav";
import { useImageStore } from "@/store/useImageStore";
import URLDisplay from "@/components/edit/URLDisplay";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";

export default function EditScreen() {
  const { url } = useLocalSearchParams();
  const { params, updateParams, currentUrl } = useImageStore(url as string)((state: any) => ({
    params: state.params,
    history: state.history,
    currentUrl: state.currentUrl,
    updateParams: state.updateParams,
  }));

  useEffect(() => {
    console.log("Current URL:", currentUrl);
  }, [currentUrl]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleOpenRotationModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleOpenAdjustmentModal = () => {
    console.log("Open Modal");
  };

  const handleFlipHorizontal = () => {
    updateParams({ ...params, flip: "h" });
  };

  const handleFlipVertical = () => {
    updateParams({ ...params, flip: "v" });
  };

  const handleFlipBoth = () => {
    updateParams({ ...params, flip: "hv" });
  };

  const handleOrientationChange = (value: number) => {
    updateParams({ ...params, orient: value.toString() });
  };

  const handleRotationChange = (value: number) => {
    updateParams({ ...params, rot: value.toString() });
  };

  console.log(currentUrl);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "bottom", "left"]}>
      <TopNav />
      <View className="w-full px-4 py-2 h-96 items-center justify-center">
        <Image
          source={{ uri: currentUrl as string }}
          className="h-full w-full"
          contentFit="contain"
        />
      </View>
      <URLDisplay currentUrl={currentUrl as string} />
      <View className="flex-row w-full justify-center px-4 space-x-5 mb-3">
        <TouchableOpacity
          className="h-10 justify-center items-center flex-1 bg-neutral-600 rounded-lg"
          onPress={handleOpenRotationModal}
        >
          <Text className="text-base text-white">Rotation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="h-10 justify-center items-center flex-1 bg-neutral-600 rounded-lg"
          onPress={handleOpenAdjustmentModal}
        >
          <Text className="text-base text-white">Adjustment</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item }) => {
          return (
            <View className="h-16 w-full bg-red-500">
              <Text>{item}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.toString()}
      />
      <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
        <BottomSheetView className="flex-1 mx-4 p-4">
          <Text className="text-lg font-bold mb-4">Rotation</Text>
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className="px-4 py-2 bg-neutral-600 rounded-lg"
              onPress={handleFlipHorizontal}
            >
              <Text className="text-white">Flip Horizontal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-neutral-600 rounded-lg"
              onPress={handleFlipVertical}
            >
              <Text className="text-white">Flip Vertical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-neutral-600 rounded-lg"
              onPress={handleFlipBoth}
            >
              <Text className="text-white">Flip Both</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base font-semibold mb-2">Orientation</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={8}
            step={1}
            value={parseInt(params.orient || "1")}
            onValueChange={handleOrientationChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text className="text-base font-semibold mb-2 mt-4">Rotation</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={359}
            step={1}
            value={parseInt(params.rot || "0")}
            onValueChange={handleRotationChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
