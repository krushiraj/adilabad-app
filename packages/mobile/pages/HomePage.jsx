import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
      scrollEnabled={false} // Disable manual scrolling
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
        scrollEventThrottle={16}
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

const CategoryTabs = ({ categories, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <View style={styles.tabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              selectedCategory === category && styles.tabSelected,
            ]}
            onPress={() => {
              setSelectedCategory(category);
              onSelect(category);
            }}
          >
            <Text style={styles.tabText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const CategoryGrid = ({ items, category, onSelect, navigation }) => {
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <FlatList
      data={filteredItems}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150,
      }}
      ListHeaderComponent={
        <CategoryTabs categories={categories} onSelect={onSelect} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Details", { item })}
        >
          <View style={styles.gridItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `${item.id}${index}`}
      numColumns={2} // Adjust as needed
      scrollEnabled={false} // Disable manual scrolling
    />
  );
};

const HomePage = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <>
      <ScrollView>
      <BannerAd ads={ads} />
        <View style={styles.container}>
          <ImageCarousel images={carouselImages} />
          <CategoryGrid
            items={gridItems}
            category={selectedCategory}
            onSelect={setSelectedCategory}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </>
  );
};

const ads = [
  {
    id: 1,
    title: "ADILABAD APP : All-In-One App for local business.",
  },
  {
    id: 2,
    title: "Now we are on Android and iOS as native apps. Download Now!",
  },
];

const carouselImages = [
  "https://localpay.s3.ap-south-1.amazonaws.com/graphics/adilabad_1.jpg",
  "https://localpay.s3.ap-south-1.amazonaws.com/graphics/adilabad_2.jpg",
  "https://localpay.s3.ap-south-1.amazonaws.com/graphics/adilabad_3.jpg",
  "https://localpay.s3.ap-south-1.amazonaws.com/graphics/adilabad_4.jpg",
];

const categories = ["Grocery", "Medicine", "Food", "Electronics", "Fashion"];

const gridItems = [
  {
    id: 1,
    title: "Grocery Item 1",
    category: "Grocery",
  },
  {
    id: 2,
    title: "Grocery Item 2",
    category: "Grocery",
  },
  {
    id: 1,
    title: "Grocery Item 1",
    category: "Grocery",
  },
  {
    id: 2,
    title: "Grocery Item 2",
    category: "Grocery",
  },
  {
    id: 1,
    title: "Grocery Item 1",
    category: "Grocery",
  },
  {
    id: 2,
    title: "Grocery Item 2",
    category: "Grocery",
  },
  {
    id: 1,
    title: "Grocery Item 1",
    category: "Grocery",
  },
  {
    id: 2,
    title: "Grocery Item 2",
    category: "Grocery",
  },
  {
    id: 3,
    title: "Medicine Item 1",
    category: "Medicine",
  },
  {
    id: 4,
    title: "Medicine Item 2",
    category: "Medicine",
  },
  {
    id: 5,
    title: "Food Item 1",
    category: "Food",
  },
  {
    id: 6,
    title: "Food Item 2",
    category: "Food",
  },
  {
    id: 7,
    title: "Electronics Item 1",
    category: "Electronics",
  },
  {
    id: 8,
    title: "Electronics Item 2",
    category: "Electronics",
  },
  {
    id: 9,
    title: "Fashion Item 1",
    category: "Fashion",
  },
  {
    id: 10,
    title: "Fashion Item 2",
    category: "Fashion",
  },
];

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  bannerContainer: {
    flexDirection: "row",
    maxHeight: 46,
    position: "relative",
    top: 0,
    backgroundColor: "lightblue",
  },
  bannerText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    maxHeight: 46,
    textAlignVertical: "center",
  },
  carouselContainer: {
    height: 200,
    width: "100%",
  },
  tabsContainer: {
    height: 46,
    width: "100%",
    marginVertical: 10,
    textAlignVertical: "center",
  },
  tab: {
    height: 46,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gridItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
