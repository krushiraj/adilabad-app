import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

// Import your custom components here
import CustomDrawerContent from './CustomDrawerContent';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#f4511e", // Example background color
        },
        headerTintColor: "#fff", // Example tint color
        headerTitleStyle: {
          fontWeight: "bold", // Example title style
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Ionicons
              name="menu"
              size={32}
              color="#fff"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
      })}
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

export default DrawerNavigator;
