import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, List, Switch, Divider } from "react-native-paper";

export default function Settings() {
  const router = useRouter();
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);
  const [isRecommendationsEnabled, setIsRecommendationsEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="CaseVault" titleStyle={styles.headerText} />
        <Appbar.Action icon="account-circle" onPress={() => {router.push("/profile")}} />
      </Appbar.Header>

      {/* Settings List */}
      <ScrollView>
        <View style={styles.section}>
          <List.Subheader style={styles.subheader}>Change Settings</List.Subheader>

          {/* Push Notifications */}
          <List.Item
            title="Push Notifications"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={isPushEnabled}
                onValueChange={() => setIsPushEnabled(!isPushEnabled)}
              />
            )}
          />
          <Divider />

          {/* Recommendations */}
          <List.Item
            title="Recommendations"
            left={() => <List.Icon icon="folder" />}
            right={() => (
              <Switch
                value={isRecommendationsEnabled}
                onValueChange={() =>
                  setIsRecommendationsEnabled(!isRecommendationsEnabled)
                }
              />
            )}
          />
          <Divider />

          {/* Dark Mode */}
          <List.Item
            title="Dark Mode"
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDarkModeEnabled}
                onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
              />
            )}
          />
          <Divider />

          {/* Password Reset */}
          <List.Item
            title="Password Reset"
            left={() => <List.Icon icon="lock-reset" />}
            onPress={() => {}}
          />
          <Divider />

          {/* Font Style */}
          <List.Accordion
            title="Font Style"
            left={() => <List.Icon icon="format-font" />}
          >
            <List.Item title="Default" />
            <List.Item title="Serif" />
            <List.Item title="Sans Serif" />
          </List.Accordion>
          <Divider />

          {/* Font Size */}
          <List.Accordion
            title="Font Size"
            left={() => <List.Icon icon="format-size" />}
          >
            <List.Item title="Small" />
            <List.Item title="Medium" />
            <List.Item title="Large" />
          </List.Accordion>
          <Divider />

          {/* Help */}
          <List.Item
            title="Help"
            left={() => <List.Icon icon="help-circle" />}
            onPress={() => {}}
          />
          <Divider />

          {/* Logout */}
          <List.Item
            title="Logout"
            left={() => <List.Icon icon="logout" />}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  section: {
    padding: 20,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
