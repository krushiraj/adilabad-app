import React, { useState } from "react";
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

const categories = ["Grocery", "Medicine", "Food", "Electronics", "Fashion"];

const CategoryGrid = ({ items, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <>
      <FlatList
        data={filteredItems}
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
