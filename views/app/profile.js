import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation
  const navigateTo = (route) => {
    router.push(route); // Navigate to the specified route
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CaseVault</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../assets/images/signup.jpg")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>Anil Goswami</Text>
        <Text style={styles.role}>Lawyer, Gauhati High Court</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <Option
          icon={<FontAwesome name="user" size={24} color="#00A878" />}
          title="Update Your Profile"
          onPress={() => navigateTo('/user-profile')} // Navigate to Change Profile
        />
        <Option
          icon={<MaterialIcons name="settings" size={24} color="#00A878" />}
          title="Settings"
          onPress={() => navigateTo('/setting')} // Navigate to Settings
        />
        <Option
          icon={<FontAwesome name="history" size={24} color="#00A878" />}
          title="History"
          onPress={() => navigateTo('/history')} // Navigate to History
        />
        <Option
          icon={<MaterialIcons name="file-download" size={24} color="#00A878" />}
          title="Downloads"
          onPress={() => navigateTo('/download')} // Navigate to Downloads
        />
      </View>
    </View>
  );
};

const Option = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.iconWrapper}>{icon}</View>
    <Text style={styles.optionText}>{title}</Text>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#00A878",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "gray",
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 1,
  },
  iconWrapper: {
    width: 40,
    alignItems: "center",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;
