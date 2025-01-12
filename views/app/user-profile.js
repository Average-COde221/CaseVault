import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Appbar, Card, Button, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            // Handle menu press
          }}
        />
        <Appbar.Content title="CaseVault" titleStyle={styles.appTitle} />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            // Handle options menu
          }}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image style={styles.profileImage} source={require("../assets/images/profile.jpg")}/>
          <Text style={styles.profileName}>Jane Smith</Text>
          <Text style={styles.profileEmail}>janesmith@email.com</Text>
        </View>

        {/* Account Info */}
        <Card style={styles.card}>
          <Card.Title title="Account" />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text>Job Title</Text>
              <Button compact mode="text" onPress={() => {}}>Edit</Button>
            </View>
            <Text style={styles.infoText}>Lawyer</Text>

            <View style={styles.infoRow}>
              <Text>Name</Text>
              <Button compact mode="text" onPress={() => {}}>Edit</Button>
            </View>
            <Text style={styles.infoText}>Jane Smith</Text>

            <View style={styles.infoRow}>
              <Text>Email</Text>
              <Button compact mode="text" onPress={() => {}}>Edit</Button>
            </View>
            <Text style={styles.infoText}>janesmith@email.com</Text>
          </Card.Content>
        </Card>

        {/* Your Uploads */}
        <Card style={styles.card}>
          <Card.Title title="Your Uploads" />
          <Card.Content>
            <View style={styles.uploadRow}>
              <View>
                <Text>Title</Text>
                <Text style={styles.infoText}>Date and Author</Text>
              </View>
              <IconButton icon="dots-vertical" onPress={() => {}} />
            </View>
            <View style={styles.uploadRow}>
              <View>
                <Text>Title</Text>
                <Text style={styles.infoText}>Date and Author</Text>
              </View>
              <IconButton icon="dots-vertical" onPress={() => {}} />
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  appBar: {
    backgroundColor: '#00796b',
  },
  appTitle: {
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 10,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    color: '#666',
    marginBottom: 8,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  scrollContent: {
    paddingBottom: 20, // Adds empty space at the bottom
  },
});

export default Profile;
