import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

const TaskScreen = ({ route }) => {
  const { visit } = route.params;
  const navigation = useNavigation();

  // Updated tasks data
  const tasksData = [
    { id: '1', taskName: 'Outlet Image' },
    { id: '2', taskName: 'Inventory Check' },
    { id: '3', taskName: 'Merchandise' },
    { id: '4', taskName: 'Order Capture' },
    { id: '5', taskName: 'Take Signature' },
    { id: '6', taskName: 'Product Return' },
  ];

  // Timer state
  const [timer, setTimer] = useState(0);
  const [isVisitOngoing, setIsVisitOngoing] = useState(false);

  useEffect(() => {
    let intervalId;

    // Function to start the timer
    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    };

    // Function to stop the timer
    const stopTimer = () => {
      clearInterval(intervalId);
    };

    // Toggle between starting and stopping the timer
    if (isVisitOngoing) {
      startTimer();
    } else {
      stopTimer();
    }

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [isVisitOngoing]);

  const toggleVisit = () => {
    setIsVisitOngoing((prevIsVisitOngoing) => !prevIsVisitOngoing);
  };

  const getDirections = (latitude, longitude) => {
    const destination = `${latitude},${longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  
    Linking.openURL(url)
      .then((data) => {
        console.log('Google Maps opened successfully:', data);
      })
      .catch((error) => {
        console.error('Error opening Google Maps:', error);
      });
  };
  
  const handleTaskPress = (taskId) => {
    // Navigate to the respective task screen based on taskId
    switch (taskId) {
      case '1':
        navigation.navigate('Outlet Image');
        break;
      case '2':
        navigation.navigate('Inventory Check');
        break;
      case '3':
        navigation.navigate('Merchandise');
        break;
      case '4':
        navigation.navigate('Order Capture');
        break;
      case '5':
        navigation.navigate('Take Signature');
        break;
      case '6':
        navigation.navigate('Product Return');
        break;
      
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={isVisitOngoing ? styles.stopVisitButton : styles.startVisitButton} onPress={toggleVisit}>
        <Text style={styles.buttonText}>{isVisitOngoing ? 'Stop Visit' : 'Start Visit'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> getDirections(visit.coordinates.latitude, visit.coordinates.longitude)}>
        <Text style={styles.buttonText}>Get Directions</Text>
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Visit Duration</Text>
        <Text style={styles.timerText}>{formatTimer(timer)}</Text>
      </View>

      <Text style={styles.header}>Complete Tasks for {visit.accountName}</Text>

      <FlatList
        data={tasksData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item.id)}>
            <View style={styles.taskItem}>
              <Text style={styles.taskName}>{item.taskName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const formatTimer = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatDigit = (digit) => (digit < 10 ? `0${digit}` : digit);

  return `${formatDigit(hours)}:${formatDigit(minutes)}:${formatDigit(remainingSeconds)}`;
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
  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  startVisitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  stopVisitButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TaskScreen;