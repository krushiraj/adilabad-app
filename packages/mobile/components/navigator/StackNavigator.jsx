import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import DetailsPage from "../../pages/DetailsPage";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#f4511e", // Example background color
      },
      headerTintColor: "#fff", // Example tint color
      headerTitleStyle: {
        fontWeight: "bold", // Example title style
      },
    }}
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
        title: route.params.item.title,
      })}
    />
    {/* You can add more screens that should not appear in the drawer here */}
  </Stack.Navigator>
);

export default StackNavigator;
