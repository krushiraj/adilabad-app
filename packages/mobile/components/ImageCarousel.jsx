import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

const ImageCarousel = ({ images, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const animatedScroll = new Animated.Value(0);

  animatedScroll.addListener(({ value }) => {
    const index = Math.floor(value / screenWidth);
    setCurrentIndex(index);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      scrollViewRef.current.scrollTo({
        x: screenWidth * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, interval);

    return () => {
      animatedScroll.removeAllListeners();
      clearInterval(timer);
    };
  }, [currentIndex, images.length]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedScroll } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={200}
        style={styles.carouselContainer}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: screenWidth, resizeMode: "stretch" }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    width: "100%",
  },
});
