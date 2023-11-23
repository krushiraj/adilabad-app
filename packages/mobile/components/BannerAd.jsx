import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";

const BannerAd = ({ ads }) => {
  const scrollX = new Animated.Value(0);
  const scrollViewRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const adWidth = screenWidth; // Assuming each ad takes up the full width of the screen
  const totalWidth = adWidth * ads.length;

  scrollX.addListener(({ value }) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: value, animated: false });
    }
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -totalWidth,
        duration: ads.length * 10000, // Adjust time here for speed control
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
        {ads.map((ad, index) => (
          <Text key={index} style={styles.bannerText}>
            {ad.title}
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
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: "auto",
    textAlignVertical: "center",
    alignItems: "center",
  },
});
