import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Import your actual screens here
import Profile from "./profile";
import Settings from "./setting";
import History from "./history";
import Downloads from "./download";
import Login from "./Login";

const Drawer = createDrawerNavigator();

// Custom Header with Hamburger Menu
const CustomHeader = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      {/* Hamburger Menu Icon */}
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <MaterialIcons name="menu" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

// Main Layout for Drawer Navigator
export default function Layout() {
  const router = useRouter();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: ({ navigation, route }) => (
            <CustomHeader title={route.name} navigation={navigation} />
          ),
          drawerActiveTintColor: "#00A878",
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="Profile"
          component={Profile}  // Reference to the Profile screen
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ color }) => (
              <MaterialIcons name="person" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}  // Reference to the Settings screen
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color }) => (
              <MaterialIcons name="settings" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="History"
          component={History}  // Reference to the History screen
          options={{
            drawerLabel: "History",
            drawerIcon: ({ color }) => (
              <MaterialIcons name="history" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Downloads"
          component={Downloads}  // Reference to the Downloads screen
          options={{
            drawerLabel: "Downloads",
            drawerIcon: ({ color }) => (
              <MaterialIcons name="download" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Login"
          component={Login}  // Reference to the Login screen
          options={{
            drawerLabel: "Login/Logout",
            drawerIcon: ({ color }) => (
              <MaterialIcons name="logout" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00A878",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
