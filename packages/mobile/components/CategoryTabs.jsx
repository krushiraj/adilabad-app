import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";

const CategoryTabs = ({ categories, selectedCategory, onSelect }) => (
  <View style={styles.tabsContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category._id}
          style={[
            styles.tab,
            selectedCategory &&
              selectedCategory._id === category._id &&
              styles.tabSelected,
          ]}
          onPress={() => {
            onSelect(category);
          }}
        >
          <Image
            source={{ uri: category.image }}
            height={30}
            width={30}
          />
          <Text style={styles.tabText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

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
