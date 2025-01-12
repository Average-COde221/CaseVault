import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

export default function DownloadsScreen() {
  // State for managing individual downloads
  const [downloads, setDownloads] = useState([
    {
      id: "1",
      title: "Title 1",
      author: "Author 1",
      date: "01 Jan 2025",
      image: null, // Placeholder for image
    },
    {
      id: "2",
      title: "Title 2",
      author: "Author 2",
      date: "02 Jan 2025",
      image: null, // Placeholder for image
    },
    {
      id: "3",
      title: "Title 3",
      author: "Author 3",
      date: "03 Jan 2025",
      image: null, // Placeholder for image
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter downloads based on the search query
  const filteredDownloads = downloads.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle deletion of a download
  const deleteDownload = (id) => {
    setDownloads((prevDownloads) => prevDownloads.filter((item) => item.id !== id));
  };

  // Clear all downloads
  const clearDownloads = () => {
    setDownloads([]);
  };

  // Define the renderItem function
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Placeholder for the image */}
      <View style={styles.imagePlaceholder}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Image</Text>
        )}
      </View>

      {/* Item details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>
          {item.date} by {item.author}
        </Text>
      </View>

      {/* Delete button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteDownload(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Page title */}
      <Text style={styles.headerText}>Downloads</Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Downloads"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List of downloads */}
      <FlatList
        data={filteredDownloads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No Downloads Available</Text>}
      />

      {/* Clear Downloads button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearDownloads}>
        <Text style={styles.clearButtonText}>Clear Downloads</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  list: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageText: {
    color: "#fff",
    fontSize: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    color: "red",
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
});
