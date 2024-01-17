// InventoryCheckTaskScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Merchandise = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merchandise</Text>
      {/* Add components related to Inventory Check task here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // Add additional styles as needed
});

export default Merchandise;
