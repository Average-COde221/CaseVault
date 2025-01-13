import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the Firebase method
import { auth } from "../firebaseConfig"; // Import your Firebase configuration

export default function LoginScreen() {
  const router = useRouter(); // Use router for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      // Call Firebase sign-in method
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Retrieve ID token
      const idToken = await userCredential.user.getIdToken();

      Alert.alert("Success", "Login successful!");
      console.log("ID Token:", idToken); // Log the ID token
      router.push("/"); // Navigate to the Home screen
    } catch (error) {
      console.error("Error logging in:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/library.webp")} // image path
          style={styles.image}
        />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Case_Vault.webp")} // Logo image
          style={styles.logo}
        />
      </View>

      {/* Title and Subtitles */}
      <Text style={styles.appName}>CaseVault</Text>
      <Text style={styles.subtitle}>
        Your one-tap solution to access legal knowledge
      </Text>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subheading}>Log Into Your Account</Text>

      {/* Form */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Links */}
      <TouchableOpacity onPress={() => Alert.alert("Feature Coming Soon!")}>
        <Text style={styles.linkText}>FORGOT YOUR PASSWORD?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Signup")}>
        <Text style={styles.signUpText}>
          Don’t Have An Account? <Text style={styles.linkHighlight}>SIGN UP</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#00A878",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#008080",
    marginBottom: 10,
    textAlign: "center",
  },
  signUpText: {
    color: "#555",
    textAlign: "center",
  },
  linkHighlight: {
    color: "#008080",
    fontWeight: "bold",
  },
});
