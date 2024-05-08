import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "@/components/Edit/TopNav";
import { useImageStore } from "@/store/useImageStore";
import URLDisplay from "@/components/Edit/URLDisplay";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import OperationsRow from "@/components/Edit/OperationsRow";
import ActionsHistory from "@/components/Edit/ActionsHistory";
import CustomSlider from "@/components/Edit/CustomSlider";
import Separator from "@/components/common/Separator";
import EditImage from "@/components/Edit/EditImage";
import clsx from "clsx";

export default function EditScreen() {
  const { url } = useLocalSearchParams();
  const { baseUrl, params, updateParams, resetState, history, revertToHistory } = useImageStore(
    (state) => ({
      baseUrl: url as string,
      params: state.params,
      history: state.history,
      updateParams: state.updateParams,
      revertToHistory: state.revertToHistory,
      resetState: state.resetState,
    })
  );

  const colorScheme = useColorScheme();

  const handlePressReset = () => {
    resetState();
  };

  const bottomSheetRotationModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAdjustmentModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["40%", "60%"], []);
  const snapPointsAdjustment = useMemo(() => ["40%", "90%"], []);

  const handleOpenRotationModal = useCallback(() => {
    bottomSheetRotationModalRef.current?.present();
  }, []);

  const handleOpenAdjustmentModal = () => {
    bottomSheetAdjustmentModalRef.current?.present();
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

  const handleFlipNone = () => {
    updateParams({ ...params, flip: undefined });
  };

  const handleOrientationChange = (value: number) => {
    updateParams({ ...params, orient: value.toString() });
  };

  const handleRotationChange = (value: number) => {
    updateParams({ ...params, rot: value.toString() });
  };

  const handleNoInvert = () => {
    updateParams({ ...params, invert: undefined });
  };

  const handleInvert = () => {
    updateParams({ ...params, invert: "true" });
  };

  const currentUrl = `${baseUrl}?${Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&")}`;

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const renderRotationBottomSheetContent = useCallback(() => {
    return (
      <BottomSheetModal
        backgroundStyle={{ backgroundColor: colorScheme === "dark" ? "#111" : "#fff" }}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRotationModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <BottomSheetView className="flex-1">
          <View className="mx-4 pt-4">
            <Text
              className={clsx(
                "text-lg font-bold mb-4",
                colorScheme === "dark" ? "text-white" : "text-black"
              )}
            >
              Flip
            </Text>
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity
                className="px-3 py-2 bg-neutral-600 rounded-lg"
                onPress={handleFlipNone}
              >
                <Text className="text-white">None</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-2 bg-neutral-600 rounded-lg"
                onPress={handleFlipHorizontal}
              >
                <Text className="text-white">Horizontal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-2 bg-neutral-600 rounded-lg"
                onPress={handleFlipVertical}
              >
                <Text className="text-white">Vertical</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-3 py-2 bg-neutral-600 rounded-lg"
                onPress={handleFlipBoth}
              >
                <Text className="text-white">Flip Both</Text>
              </TouchableOpacity>
            </View>

            <CustomSlider
              title="Orientation"
              minimumValue={0}
              maximumValue={8}
              step={1}
              value={parseInt(params.orient || "0")}
              onSlidingComplete={handleOrientationChange}
            />
            <CustomSlider
              title="Rotation"
              minimumValue={0}
              maximumValue={360}
              step={0.1}
              value={parseInt(params.rot || "0")}
              onSlidingComplete={handleRotationChange}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }, [params]);

  const handleBrightnessChange = (value: number) => {
    updateParams({ ...params, bri: value.toString() });
  };

  const handleContrastChange = (value: number) => {
    updateParams({ ...params, con: value.toString() });
  };

  const handleExposureChange = (value: number) => {
    updateParams({ ...params, exp: value.toString() });
  };

  const handleGammaChange = (value: number) => {
    updateParams({ ...params, gam: value.toString() });
  };

  const handleHighlightChange = (value: number) => {
    updateParams({ ...params, high: value.toString() });
  };

  const handleHueShiftChange = (value: number) => {
    updateParams({ ...params, hue: value.toString() });
  };

  const handleSaturationChange = (value: number) => {
    updateParams({ ...params, sat: value.toString() });
  };

  const handleShadowChange = (value: number) => {
    updateParams({ ...params, shad: value.toString() });
  };

  const handleSharpenChange = (value: number) => {
    updateParams({ ...params, sharp: value.toString() });
  };

  const handleUnsharpMaskChange = (value: number) => {
    updateParams({ ...params, usm: value.toString() });
  };

  const handleUnsharpMaskRadiusChange = (value: number) => {
    updateParams({ ...params, usmrad: value.toString() });
  };

  const handleVibranceChange = (value: number) => {
    updateParams({ ...params, vib: value.toString() });
  };

  const renderAdjustmentBottomSheetContent = useCallback(() => {
    return (
      <BottomSheetModal
        backgroundStyle={{ backgroundColor: colorScheme === "dark" ? "#111" : "#fff" }}
        backdropComponent={renderBackdrop}
        ref={bottomSheetAdjustmentModalRef}
        index={0}
        snapPoints={snapPointsAdjustment}
      >
        <BottomSheetView className="flex-1">
          <ScrollView className="mx-5">
            <SafeAreaView edges={["bottom"]}>
              <CustomSlider
                title="Brightness"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.bri || "0")}
                onSlidingComplete={handleBrightnessChange}
              />
              <CustomSlider
                title="Contrast"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.con || "0")}
                onSlidingComplete={handleContrastChange}
              />
              <CustomSlider
                title="Exposure"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.exp || "0")}
                onSlidingComplete={handleExposureChange}
              />
              <CustomSlider
                title="Gamma"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.gam || "0")}
                onSlidingComplete={handleGammaChange}
              />
              <CustomSlider
                title="Highlight"
                minimumValue={-100}
                maximumValue={0}
                step={1}
                value={parseInt(params.high || "0")}
                onSlidingComplete={handleHighlightChange}
              />
              <CustomSlider
                title="Hue Shift"
                minimumValue={0}
                maximumValue={360}
                step={1}
                value={parseInt(params.hue || "0")}
                onSlidingComplete={handleHueShiftChange}
              />
              <Text
                className={clsx(
                  "text-lg font-bold mb-4",
                  colorScheme === "dark" ? "text-white" : "text-black"
                )}
              >
                Invert
              </Text>
              <View className="flex-row space-x-6 mb-4">
                <TouchableOpacity
                  className="px-5 py-2 bg-neutral-600 rounded-lg"
                  onPress={handleNoInvert}
                >
                  <Text className="text-white">No Invert</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-5 py-2 bg-neutral-600 rounded-lg"
                  onPress={handleInvert}
                >
                  <Text className="text-white">Invert</Text>
                </TouchableOpacity>
              </View>
              <CustomSlider
                title="Saturation"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.sat || "0")}
                onSlidingComplete={handleSaturationChange}
              />
              <CustomSlider
                title="Shadow"
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={parseInt(params.shad || "0")}
                onSlidingComplete={handleShadowChange}
              />
              <CustomSlider
                title="Sharpen"
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={parseInt(params.sharp || "0")}
                onSlidingComplete={handleSharpenChange}
              />
              <CustomSlider
                title="Unsharp Mask"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.usm || "0")}
                onSlidingComplete={handleUnsharpMaskChange}
              />
              <CustomSlider
                title="Unsharp Mask Radius"
                minimumValue={0}
                maximumValue={500}
                step={0.1}
                value={parseInt(params.usmrad || "2.5")}
                onSlidingComplete={handleUnsharpMaskRadiusChange}
              />
              <CustomSlider
                title="Vibrance"
                minimumValue={-100}
                maximumValue={100}
                step={1}
                value={parseInt(params.vib || "2.5")}
                onSlidingComplete={handleVibranceChange}
              />
            </SafeAreaView>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }, [params]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "bottom", "left"]}>
        <TopNav onPressExport={() => {}} />
        <Separator height={3} />
        <EditImage currentUrl={currentUrl as string} />
        <Separator height={3} />
        <URLDisplay currentUrl={currentUrl as string} />
        <Separator height={3} />
        <OperationsRow
          onPressReset={handlePressReset}
          onPressRotation={handleOpenRotationModal}
          onPressAdjustment={handleOpenAdjustmentModal}
        />
        <Separator height={3} />
        <ActionsHistory baseUrl={baseUrl} history={history} onRevert={revertToHistory} />
      </SafeAreaView>
      {renderRotationBottomSheetContent()}
      {renderAdjustmentBottomSheetContent()}
    </>
  );
}
