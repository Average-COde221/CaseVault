import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [history, setHistory] = useState([
    { id: '1', title: 'Title 1', date: 'Jan 1, 2025', author: 'Author 1' },
    { id: '2', title: 'Title 2', date: 'Jan 2, 2025', author: 'Author 2' },
    { id: '3', title: 'Title 3', date: 'Jan 3, 2025', author: 'Author 3' },
  ]);

  const clearHistory = () => setHistory([]);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemContent}>
        <View style={styles.itemIcon}>
          <Ionicons name="document-text-outline" size={24} color="#666" />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{`${item.date} • ${item.author}`}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="checkbox-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CaseVault</Text>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <Text style={styles.historyTitle}>History</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Your History"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Clear History Button */}
      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: "#00A878",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  clearButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 13,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    bottom : 12,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
