import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import CategoryTabs from "./CategoryTabs";
import { apiCallAddresses } from "../utils/api";

const CategoryGrid = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    console.log("Fetching categories:", apiCallAddresses.categories.listAllWithoutParent);
    fetch(apiCallAddresses.categories.listAllWithoutParent)
      .then((response) => {
        return response.json();
      })
      .then((categoriesData) => {
        setCategories(categoriesData);
        setSelectedCategory(categoriesData[0]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    fetch(apiCallAddresses.listings.listByCategory`${selectedCategory._id}`)
      .then((response) => {
        return response.json();
      })
      .then((itemsData) => {
        setItems(itemsData);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [selectedCategory]);

  return (
    <>
      <FlatList
        data={items}
        ListHeaderComponent={
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate("Details", { item })}
          >
            <View style={styles.gridItem}>
              <Image
                source={{
                  uri: item.coverImage || "https://via.placeholder.com/150",
                }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.id}${index}`}
        numColumns={2}
        scrollsToTop={true}
      />
    </>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
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
