import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase method
import { auth } from "../config/firebaseConfig"; // Import Firebase config
import axios from "axios"; // Import axios

const SignUpScreen = () => {
  const router = useRouter(); // useRouter for navigation with expo-router
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      // Use Firebase to create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // After successful sign-up, show an alert
      Alert.alert("Success", "Account created successfully!");
      console.log("User details:", { fullName, email, password });

      // Send the user data to your backend API using axios
      sendUserDataToBackend({ fullName, email, password });

      // Navigate to Login screen
      router.push("/Login"); // Navigate to the Login screen
    } catch (error) {
      // Handle any errors during the sign-up process
      Alert.alert("Sign-Up Error", error.message);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/Login");
  };

  // Function to send user data to backend using axios
  async function sendUserDataToBackend(userData) {
    try {
      const response = await axios.post("http://localhost:5000/api/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Backend Response:", response.data); // Handle the response
    } catch (error) {
      console.error("Error sending data to backend:", error);
      Alert.alert("Error", "Failed to send data to backend.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/signup.jpg")} // Replace with your image path
        style={styles.backgroundImage}
      />

      {/* Logo */}
      <Image
        source={require("../assets/images/Case_Vault.webp")} // Replace with your logo path
        style={styles.logo}
      />

      <Text style={styles.title}>CaseVault</Text>
      <Text style={styles.subtitle}>
        Your one-tap solution to access legal knowledge
      </Text>

      <Text style={styles.sectionTitle}>Sign Up</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter full name..."
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter email..."
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password..."
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGNUP</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already Have An Account?{" "}
        <Text style={styles.loginLink} onPress={handleLoginRedirect}>
          LOG IN
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#00A878",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    color: "#006f5b",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
