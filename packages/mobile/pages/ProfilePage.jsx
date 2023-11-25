import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { removeUserData, saveUserData } from "../utils";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : "");
  const [profilePic, setProfilePic] = useState(
    user?.profilePic || "https://via.placeholder.com/150"
  );

  const handleSave = () => {
    setUser({ ...user, name, profilePic });
    saveUserData({ ...user, name, profilePic });
  };

  const handleLogout = () => {
    setUser(null);
    removeUserData();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
          <Text style={styles.mobileNumber}>
            {user ? user.phoneNumber : ""}
          </Text>
          <View style={styles.inputWrapper}>
            <Text>Name:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Profile Pic URL:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Profile Pic URL"
              value={profilePic}
              onChangeText={setProfilePic}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Save" onPress={handleSave} />
            <Button color={"red"} title="Logout" onPress={handleLogout} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  mobileNumber: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
