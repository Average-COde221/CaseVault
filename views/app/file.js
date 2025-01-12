import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker"; // For picking files
import { Button } from "react-native-paper";

export default function App() {
  const [file, setFile] = useState(null); // State to manage the selected file
  const [caseDetails, setCaseDetails] = useState(""); // State for the "About the Case" input

  // Function to handle file selection
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow any file type
      });

      if (result.type === "success") {
        setFile(result);
      } else {
        console.log("File selection canceled.");
      }
    } catch (error) {
      console.error("Error selecting file: ", error);
    }
  };

  // Function to handle download button
  const handleDownload = () => {
    if (!file) {
      Alert.alert("Error", "Please upload a file before downloading.");
      return;
    }

    if (!caseDetails) {
      Alert.alert("Error", "Please add details about the case before downloading.");
      return;
    }

    // Example download logic
    Alert.alert(
      "Download Triggered",
      `Downloading file: ${file.name}\nCase Details: ${caseDetails}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CaseVault</Text>
      </View>

      {/* Title and Author */}
      <View style={styles.content}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.subtitle}>Date and Author</Text>

        {/* File Upload */}
        <TouchableOpacity style={styles.fileUpload} onPress={handleFileUpload}>
          <Text style={styles.fileUploadText}>
            {file ? file.name : "Choose File"}
          </Text>
        </TouchableOpacity>

        {/* About the Case */}
        <TextInput
          style={styles.textInput}
          placeholder="About the Case"
          placeholderTextColor="#aaa"
          multiline={true}
          value={caseDetails}
          onChangeText={setCaseDetails}
        />

        {/* Download Button */}
        <Button mode="contained" style={styles.downloadButton} onPress={handleDownload}>
          DOWNLOAD
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#00a699",
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  fileUpload: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  fileUploadText: {
    color: "#00a699",
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 100,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#00a699",
    paddingVertical: 10,
  },
});
