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
      <CategoryGrid items={gridItems} navigation={navigation} />
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
});

export default HomePage;
