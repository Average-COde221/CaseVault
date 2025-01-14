import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { searchDocuments } from '../services/searchService';  // Import search function

const PdfSearch = () => {
  const [query, setQuery] = useState('');  // Store the search query
  const [results, setResults] = useState([]);  // Store search results

  const handleSearch = async (text) => {
    setQuery(text);  // Update the query state
    if (text) {
      // If query text exists, search in Typesense
      const searchResults = await searchDocuments(text);
      setResults(searchResults);  // Set the results state
    } else {
      setResults([]);  // Clear results if query text is empty
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search PDFs"
        value={query}
        onChangeText={handleSearch}  // Call handleSearch on text input change
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.fileName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  searchBar: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 16 },
  resultItem: { padding: 10, borderBottomWidth: 1 },
  resultText: { fontSize: 16 },
});

export default PdfSearch;
