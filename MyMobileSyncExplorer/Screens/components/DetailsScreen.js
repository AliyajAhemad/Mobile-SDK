import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet,ScrollView } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsScreen = () => {
  // Sample user details
  const [aboutDetails, setAboutDetails] = useState({
    title: "Software Engineer",
    manager: "John Manager",
    companyName: "ABC Corp",
    userId: "john_doe123",
    employeeId: "EMP123",
  });

  const [contactDetails, setContactDetails] = useState({
    email: "john.doe@example.com",
    phone: "123-456-7890",
    mobile: "987-654-3210",
    street: "123 Main St",
    city: "Cityville",
    country: "Country",
  });

  const renderField = (label, value) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView >
    <View style={styles.container}>
      {/* About Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>About</Text>

        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{aboutDetails.title}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Manager:</Text>
        <Text style={styles.value}>{aboutDetails.manager}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Company Name:</Text>
        <Text style={styles.value}>{aboutDetails.companyName}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{aboutDetails.userId}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Employee ID:</Text>
        <Text style={styles.value}>{aboutDetails.employeeId}</Text>
      </View>

      {/* Contact Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{contactDetails.email}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{contactDetails.phone}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{contactDetails.mobile}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Street:</Text>
        <Text style={styles.value}>{contactDetails.street}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{contactDetails.city}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{contactDetails.country}</Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionContainer: {
    marginTop: 20,
    backgroundColor:'white',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 10,
  },
});

export default DetailsScreen;
