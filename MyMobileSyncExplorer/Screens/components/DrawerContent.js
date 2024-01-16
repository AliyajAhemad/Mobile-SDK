import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = ({ navigation }) => {
  // Mock user data
  const user = {
    username: "JohnDoe",
    profile: "../Images/profile.jpg",
  };

  const handleLogout = () => {
    // Implement your logout logic here
    
  };

  const handleDetails = () => {
    // Navigate to the "Details" screen
    navigation.navigate('DetailsScreen', { username: user.username, /* add more params if needed */ });
  };

  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <MaterialCommunityIcons name="account" size={30} color="black" />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="black" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.separator}></View>

      {/* Details Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleDetails} >
        <MaterialCommunityIcons name="information" size={24} color="black" />
        <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 10,
  },
});

export default DrawerContent;


