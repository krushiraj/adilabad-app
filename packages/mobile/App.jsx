import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

// components
import StackNavigator from "./components/navigator/StackNavigator";

// contexts
import { UserContext } from "./contexts/UserContext";

// utils
import { getUserData } from "./utils";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      getUserData()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
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
