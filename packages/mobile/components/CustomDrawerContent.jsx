// CustomDrawerContent.js
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { UserContext } from "../contexts/UserContext";

const CustomDrawerContent = (props) => {
  const [user, setUser] = useContext(UserContext);

  const userName = (user && (user.name || user.phoneNumber)) || "Please Login";
  const profilePicUri = (user && user.profilePic) || "https://via.placeholder.com/150";

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <>
          <Image
            source={{ uri: profilePicUri }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{userName}</Text>
        </>

        {/* Add more user details here */}
      </View>
      <DrawerItemList {...props} />
      {/* You can add more custom components here */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
    display: "flex",
    flexDirection: "row",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  userName: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  // Add more styles for your custom components here
});

export default CustomDrawerContent;
