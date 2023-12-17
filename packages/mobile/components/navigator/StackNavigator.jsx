import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import DrawerNavigator from "./DrawerNavigator";
import DetailsPage from "../../pages/DetailsPage";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#f4511e", // Example background color
      },
      headerTintColor: "#fff", // Example tint color
      headerTitleStyle: {
        fontWeight: "bold", // Example title style
      },
      ...(Platform.OS === "android"
        ? {
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="arrow-back-outline"
                  size={32}
                  color="#fff"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
          }
        : {}),
    })}
  >
    <Stack.Screen
      name="DrawerScreens"
      component={DrawerNavigator}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsPage}
      options={({ route }) => ({
        title: route.params.item.name,
      })}
    />
    {/* You can add more screens that should not appear in the drawer here */}
  </Stack.Navigator>
);

export default StackNavigator;
