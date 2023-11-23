import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

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
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              height={30}
              width={30}
            />
            <Text style={styles.tabText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    paddingVertical: 10,
    textAlignVertical: "center",
    backgroundColor: "white",
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
});

export default CategoryTabs;
