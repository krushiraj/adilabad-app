import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// components
import BannerAd from "../components/BannerAd";
import ImageCarousel from "../components/ImageCarousel";
import CategoryGrid from "../components/CategoryGrid";

const HomePage = ({ navigation }) => {
  return (
    <>
      <BannerAd ads={ads} />
      <ImageCarousel images={carouselImages} />
      <CategoryGrid navigation={navigation} />
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default HomePage;
