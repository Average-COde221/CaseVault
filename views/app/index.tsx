import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';  // Import the useNavigation hook

export default function CustomMenu() {
  const navigation = useNavigation();  // Initialize the navigation hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);  // Log out the user
      alert("Logged out successfully");
    } else {
      navigation.navigate("LoginScreen");  // Navigate to the login screen
    }
  };

  const handleProfilePress = () => {
    alert("Navigate to Profile Page!");
  };

  const handleAddAction = () => {
    alert("Add Button Pressed!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CaseVault</Text>
        <TouchableOpacity style={styles.profileCircle} onPress={handleProfilePress}>
          <Image
            source={require("../assets/images/signup.jpg")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/home.jpeg")}
          style={styles.image}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#757575" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddAction}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="account-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="settings" size={24} color="white" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="history" size={24} color="white" />
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="download" size={24} color="white" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.buttonText}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#004D40",
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#004D40",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 100, // Positioned above the row of buttons
    right: 20,
    backgroundColor: "#FF5722",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#004D40",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 60,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
});
