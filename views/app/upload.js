import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router"; // Import useRouter from Expo Router

export default function UploadCaseScreen() {
  const router = useRouter(); // Use router for navigation
  const [title, setTitle] = useState("");
  const [authorDetails, setAuthorDetails] = useState("");
  const [caseDetails, setCaseDetails] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Accept all file types
        copyToCacheDirectory: true,
      });
      if (result.type === "success") {
        setUploadedFile(result);
        Alert.alert("File Selected", result.name);
      }
    } catch (error) {
      Alert.alert("Error", "Could not select a file");
    }
  };

  const handlePublish = () => {
    if (!title || !authorDetails || !caseDetails || !uploadedFile) {
      Alert.alert("Error", "Please fill all the fields and upload a file");
      return;
    }
    Alert.alert("Success", "Case Published!");
    console.log("Uploaded Case Details:", {
      title,
      authorDetails,
      caseDetails,
      fileName: uploadedFile.name,
    });

    // Navigate back to the previous screen
    router.back();
  };

  const handleCancel = () => {
    // Navigate back to the previous screen
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CaseVault</Text>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <Text style={styles.title}>Upload New Case</Text>

        {/* Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Upload File */}
        <TouchableOpacity style={styles.fileInput} onPress={handleChooseFile}>
          <Text style={styles.fileInputText}>
            {uploadedFile ? uploadedFile.name : "Choose File"}
          </Text>
        </TouchableOpacity>

        {/* Date and Author */}
        <TextInput
          style={styles.input}
          placeholder="Enter author details"
          value={authorDetails}
          onChangeText={setAuthorDetails}
        />

        {/* Brief about the Case */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter a brief paragraph about the case"
          value={caseDetails}
          onChangeText={setCaseDetails}
          multiline
        />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.buttonText}>Publish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00A878"
  },
  headerText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  form: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  fileInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  fileInputText: {
    color: "#757575",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  publishButton: {
    backgroundColor: "#00897B",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
