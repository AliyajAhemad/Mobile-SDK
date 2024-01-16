// RetailExecutionScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import TaskScreen from './TaskScreen'; // Import the TaskScreen component
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';



const RetailExecutionScreen = () => {
  useEffect(() => {
    const checkLocationPermission = async () => {
      const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      console.log('Location permission status:', status);
    };
    
    checkLocationPermission();
    
    const requestLocationPermission = async () => {
      try {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // Add other permissions if needed
        ]);
    
        if (
          result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    
    requestLocationPermission();
    
    
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  
  const navigation = useNavigation();

  // Sample data for the list of visits
  const visitData = [
    { id: '1', accountName: 'ABC Corp', time: '10:00 AM', status: 'Planned', address: '123 Main St', coordinates: { latitude: 12.966552, longitude: 77.594710 } },
    { id: '2', accountName: 'XYZ Ltd', time: '02:30 PM', status: 'Completed', address: '456 Market St', coordinates: { latitude: 12.966552, longitude: 77.594710 } },
    // Add more visit data as needed
  ];

  const handleVisitClick = (visit) => {
    // Navigate to the TaskScreen and pass the selected visit as a parameter
    navigation.navigate('TaskScreen', { visit });
  };

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapSection}>
      <MapView
  style={styles.map}
  initialRegion={{
    latitude: 12.966552,
    longitude: 77.594710,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  provider="google" // If using Google Maps
  showsUserLocation={true} // Add this line to show the user's location
>
<Marker coordinate = {{latitude: 37.78825,longitude: -122.4324}}
         pinColor = {"purple"} // any color
         title={"title"}
         description={"description"}/>
</MapView>
      </View>

      {/* List of Visits Section */}
      <View style={styles.visitsSection}>
        <Text style={styles.sectionTitle}>List of Visits</Text>
        <FlatList
          data={visitData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleVisitClick(item)}>
              <View style={styles.visitItem}>
                <Text style={styles.visitInfo}>Account Name: {item.accountName}</Text>
                <Text style={styles.visitInfo}>Time: {item.time}</Text>
                <Text style={styles.visitInfo}>Status: {item.status}</Text>
                <Text style={styles.visitInfo}>Address: {item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mapSection: {
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    height: 200,
  },
  visitsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  visitItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  visitInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RetailExecutionScreen;
