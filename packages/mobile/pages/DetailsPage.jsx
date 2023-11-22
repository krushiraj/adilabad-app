import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { StatusBar } from "expo-status-bar";

const DetailsPage = ({ route }) => {
  const { item } = route.params;

  const [user] = useContext(UserContext);

  const itemData = {
    image: { uri: "https://via.placeholder.com/200" }, // Replace with the actual image source
    title: "Item Title", // Replace with the actual item title
    category: "Item Category", // Replace with the actual item category
    description: "Item Description", // Replace with the actual item description
    ...item,
  };

  return (
    <>
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <Image source={itemData.image} style={styles.image} />
        <Text style={styles.title}>{itemData.title}</Text>
        <Text style={styles.category}>{itemData.category}</Text>
        <Text style={styles.description}>{itemData.description}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default DetailsPage;
