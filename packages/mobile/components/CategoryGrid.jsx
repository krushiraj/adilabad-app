import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import CategoryTabs from "./CategoryTabs";

const CategoryGrid = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.21:8000/api/category")
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
    console.log(selectedCategory);
    if (!selectedCategory) {
      return;
    }

    fetch(
      `http://192.168.1.21:8000/api/listing?category=${selectedCategory._id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((itemsData) => {
        console.log(itemsData);
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
                source={{ uri: "https://via.placeholder.com/150" }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{item.title}</Text>
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
