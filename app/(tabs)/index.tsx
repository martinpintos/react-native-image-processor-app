import { FlatList, Pressable } from "react-native";
import clsx from "clsx";
import { useEffect } from "react";
import { useGalleryStore } from "@/store/useGalleryStore";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useImageStore } from "@/store/useImageStore";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function GalleryScreen() {
  const { gallery, fetchGallery } = useGalleryStore();
  const { resetState } = useImageStore();

  useEffect(() => {
    fetchGallery();
  }, []);

  const ImageItem = ({ item, index }: any) => {
    const scale = useSharedValue(1.1);

    const isLastItem = index === gallery.length - 1;
    const isEvenRow = (index + 1) % 2 === 0;

    const onPressIn = () => {
      scale.value = withSpring(1);
    };

    const onPressOut = () => {
      scale.value = withSpring(1.1);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    return (
      <Link
        // @ts-ignore
        href={{
          pathname: "/edit/[url]",
          params: {
            url: item.url,
          },
        }}
        asChild
      >
        <Pressable
          onPressIn={onPressIn}
          onPress={() => resetState()}
          onPressOut={onPressOut}
          className={clsx(
            "flex-1 h-64 items-center justify-center border-[0.7px] border-black overflow-hidden",
            !isEvenRow && isLastItem && "max-w-[50%]"
          )}
        >
          <AnimatedImage
            transition={500}
            style={animatedStyle}
            cachePolicy="memory-disk"
            source={{ uri: item.url }}
            className="w-full h-full"
          />
        </Pressable>
      </Link>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={gallery}
      keyExtractor={(item) => item.name.toString()}
      renderItem={({ item, index }) => <ImageItem item={item} index={index} />}
    />
  );
}
