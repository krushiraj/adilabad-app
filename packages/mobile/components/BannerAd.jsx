import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  Text,
  Animated,
  StyleSheet,
} from "react-native";

const charWidth = 16;
const padding = 160;

const getWidthOfAdByChar = (charCount) => {
  return (charCount * charWidth) + padding;
}

const BannerAd = ({ ads }) => {
  const scrollX = new Animated.Value(0);
  const scrollViewRef = useRef();
  const totalWidth = ads.reduce((acc, ad) => acc + getWidthOfAdByChar(ad.content.length), 0);

  scrollX.addListener(({ value }) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: value, animated: false });
    }
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -totalWidth/2,
        duration: ads.length * 5000, // Adjust time here for speed control
        useNativeDriver: true,
      })
    ).start();

    return () => {
      scrollX.removeAllListeners();
    };
  }, [ads.length, scrollX, totalWidth]);

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      style={styles.bannerContainer}
      contentContainerStyle={{
        width: totalWidth,
        alignItems: "center",
      }}
      scrollEnabled={false}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX: scrollX }],
        }}
      >
        {ads.map((ad) => (
          <Text key={ad._id} style={styles.bannerText}>
            {ad.content}
          </Text>
        ))}
      </Animated.View>
    </ScrollView>
  );
};

export default BannerAd;

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: "row",
    minHeight: 46,
    maxHeight: 46,
    position: "relative",
    top: 0,
    backgroundColor: "lightblue",
  },
  bannerText: {
    fontSize: charWidth,
    marginHorizontal: padding/2,
    marginVertical: "auto",
    textAlignVertical: "center",
    alignItems: "center",
  },
});
