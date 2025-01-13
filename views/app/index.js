import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function CustomMenu() {r
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // Sample data for "Suggested For You"
  const suggestedData = [
    { id: "1", title: "Case 1", author: "Author A" },
    { id: "2", title: "Case 2", author: "Author B" },
    { id: "3", title: "Case 3", author: "Author C" },
    { id: "4", title: "Case 4", author: "Author D" },
    { id: "5", title: "Case 5", author: "Author E" },
  ];

  useEffect(() => {
    async function loadResources() {
      for (let i = 1; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 30)); // Simulate loading
        setProgress(i);
      }
      setIsReady(true);
      SplashScreen.hideAsync();
    }

    loadResources();
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      Alert.alert("Success", "Logged out successfully!");
    } else {
      router.push("/Login");
    }
  };

  const renderSuggestedItem = ({ item }) => (
    <View style={styles.suggestedItem}>
      <Text style={styles.suggestedTitle}>{item.title}</Text>
      <Text style={styles.suggestedAuthor}>{item.author}</Text>
    </View>
  );

  if (!isReady) {
    // Splash Screen with Logo and Loading Progress
    return (
      <View style={[styles.splashContainer, { backgroundColor: "white" }]}>
        <Image
          source={require("../assets/images/Case_Vault.webp")} // Replace with your logo file path
          style={styles.splashLogo}
        />
        <Text style={[styles.splashText, { color: "#00A878" }]}>Loading... {progress}%</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CaseVault</Text>
        <TouchableOpacity style={styles.profileCircle} onPress={() => router.push("/profile")}>
          <Image
            source={require("../assets/images/profile.jpg")}
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

      {/* Suggested For You Section */}
      <View style={styles.suggestedContainer}>
        <View style={styles.suggestedHeader}>
          <Text style={styles.suggestedTitleText}>Suggested For You</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={suggestedData}
          keyExtractor={(item) => item.id}
          renderItem={renderSuggestedItem}
          numColumns={2}
          contentContainerStyle={styles.suggestedList}
        />
      </View>

      {/* Footer Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/profile")}>
          <MaterialIcons name="account-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/setting")}>
          <MaterialIcons name="settings" size={24} color="white" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/history")}>
          <MaterialIcons name="history" size={24} color="white" />
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/download")}>
          <MaterialIcons name="cloud-download" size={24} color="white" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.buttonText}>{isLoggedIn ? "Logout" : "Login"}</Text>
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
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A878",
  },
  splashLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  splashText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00A878",
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
    width: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  suggestedContainer: {
    margin: 15,
  },
  suggestedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  suggestedTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  suggestedList: {
    flexDirection: "column",
  },
  suggestedItem: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005F73",
  },
  suggestedAuthor: {
    fontSize: 12,
    color: "#757575",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#00A878",
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
