import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// components
import BannerAd from "../components/BannerAd";
import ImageCarousel from "../components/ImageCarousel";
import CategoryGrid from "../components/CategoryGrid";
import { apiCallAddresses } from "../utils/api";

const HomePage = ({ navigation }) => {
  const [ads, setAds] = React.useState([]);
  const [carouselImages, setCarouselImages] = React.useState([]);

  useEffect(() => {
    fetch(apiCallAddresses.advertisements.listAll)
      .then((res) => res.json())
      .then((data) => {
        setCarouselImages(data.filter((ad) => ad.type === "image"));
        setAds(data.filter((ad) => ad.type === "text")); 
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <BannerAd ads={ads} />
      <ImageCarousel images={carouselImages} />
      <CategoryGrid navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default HomePage;
