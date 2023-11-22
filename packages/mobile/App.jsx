import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./pages/HomePage"; // Import your screen components
import AboutPage from "./pages/AboutPage";
import CustomDrawerContent from "./components/CustomDrawerContent";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./contexts/UserContext";
import ProfilePage from "./pages/ProfilePage";
import DetailsPage from "./pages/DetailsPage";
import { getUserData } from "./utils";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e", // Example background color
        },
        headerTintColor: "#fff", // Example tint color
        headerTitleStyle: {
          fontWeight: "bold", // Example title style
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {!user && <Drawer.Screen name="Login" component={LoginPage} />}
      {user && <Drawer.Screen name="Profile" component={ProfilePage} />}
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="About" component={AboutPage} />
      {/* Add more screens here */}
    </Drawer.Navigator>
  );
};

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
      options={{ headerShown: false }}
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

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      getUserData()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    bootstrapAsync();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
