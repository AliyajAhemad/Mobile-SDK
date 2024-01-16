import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const AttendanceScreen = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [comment, setComment] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showTakePhotoButton, setShowTakePhotoButton] = useState(false);
  const [containerOne, setcontainerOne] = useState(true);
  const [containerTwo, setcontainerTwo] = useState(false);
  const navigation = useNavigation();

  const [needApproval, setNeedApproval] = useState(false);
  const [showStatusSection, setShowStatusSection] = useState(false);
  const [showBeatJumpButtons, setShowBeatJumpButtons] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkAttendance = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (currentHour > 10 || (currentHour === 10 && currentMinute > 30)) {
      // Show alert for approval needed
      setNeedApproval(true);
      Alert.alert(
        "Approval Needed",
        "You require approval to mark attendance."
      );
      setAttendanceStatus("pending");
    } else {
      // Set the attendance status to enable rendering Present and On Leave buttons
      setAttendanceStatus("pending");
    }
  };

  const handleButtonPress = (status) => {
    // Set the attendance status based on the button pressed
    setAttendanceStatus(status);
    setShowCommentSection(true); // Show comment section when either button is pressed
    setShowTakePhotoButton(true); // Show take photo button when either button is pressed
  };

  const handleTakePhoto = () => {
    // Your logic for taking a photo
    Alert.alert("Take Photo", "Logic for taking a photo goes here.");
  };

  const handleSubmit = () => {
    if(attendanceStatus == 'On Leave'){
      Alert.alert("Submitted", "Attendance marked successfully.");
    }else if (attendanceStatus === "Present" && needApproval) {
      // Show an alert for needing approval from the manager
      Alert.alert("Submitted", "You need approval from your manager. Please wait for a response!");
    }else if (attendanceStatus === "Present" && !needApproval) {
      navigation.navigate("AttendanceStatus", { attendanceStatus });
    }
  
  };

  return (
        
          <View style={styles.container}>
            {containerOne && ( 
          <View >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.currentTime}>{currentTime}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleMarkAttendance}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="calendar-check-o"
                size={20}
                color="#3498db"
                style={styles.icon}
              />
              <View style={styles.line}></View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.buttonText}>Mark Attendance</Text>
                <Text style={styles.note}>
                  If the time is greater than 10:30, you need to get approval
                  from your manager
                </Text>
              </View>
            </View>
            <View></View>
          </TouchableOpacity>

          {attendanceStatus === "pending" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.subButton}
                onPress={() => handleButtonPress("Present")}
              >
                <Text style={styles.subButtonText}>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subButton}
                onPress={() => handleButtonPress("On Leave")}
              >
                <Text style={styles.subButtonText}>On Leave</Text>
              </TouchableOpacity>
            </View>
          )}

          {showCommentSection && (
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentTextArea} // Update the style for a multiline text area
                placeholder="Enter your comment"
                multiline // Set the multiline prop to true
                numberOfLines={4} // You can adjust the number of lines as needed
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              <View style={styles.buttonRow}>
                {showTakePhotoButton && (
                  <TouchableOpacity
                    style={styles.takePhotoButton}
                    onPress={handleTakePhoto}
                  >
                    <Text style={styles.takePhotoButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          </View>
        )}
        {containerTwo && ( 
          <View></View>
        )}
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start", // Align items at the top
  },
  header: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,

    marginBottom: 5,
  },
  currentTime: {
    fontSize: 15,
  },
  button: {
    // backgroundColor: '#3498db',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
  note: {
    fontSize: 16,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  subButton: {
    // backgroundColor: "#2ecc71",
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: "48%", // Adjust width for spacing
  },
  subButtonText: {
    // color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  commentContainer: {
    marginBottom: 20,
  },
  commentTextArea: {
    height: 100, // Adjust the height as needed
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    width: "48%", // Adjust width for spacing
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  takePhotoButton: {
    // backgroundColor: "#e67e22",
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: "48%", // Adjust width for spacing
  },
  takePhotoButtonText: {
    // color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
  line: {
    height: "100%", // Use '100%' to cover the full height
    width: 1, // Adjust the width as needed
    backgroundColor: "#3498db", // Adjust the color as needed
    marginLeft: 10,
    marginRight: 10,
  },
});

export default AttendanceScreen;
