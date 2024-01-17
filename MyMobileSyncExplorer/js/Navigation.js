import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AttendanceScreen from "../Screens/AttendanceScreen";
import RetailExecutionScreen from "../Screens/RetailExecutionScreen";
import DrawerContent from "../Screens/components/DrawerContent";
import DetailsScreen from "../Screens/components/DetailsScreen";
import { useNavigation } from "@react-navigation/native";
import AttendanceStatusScreen from "../Screens/AttendanceStatus";
import TaskScreen from "../Screens/TaskScreen";
import InventoryCheckTaskScreen from "../Screens/InventoryCheckTaskScreen";
import ProductReturnTaskScreen from "../Screens/ProductReturnTaskScreen";
import OrderTaskScreen from "../Screens/OrderTaskScreen";
import CartComponent from "../Screens/components/CartComponent";
import ScreenA from "../Screens/components/ScreenA";
import ScreenB from "../Screens/components/ScreenB";
import { CartProvider } from "../Screens/components/CartContex";
import OutletImage from "../Screens/OutletImage";
import Merchandise from "../Screens/Merchandise";
import TakeSignature from "../Screens/TakeSignature";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AttendanceStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="My Attendance" component={AttendanceScreen} />
    <Stack.Screen name="AttendanceStatus" component={AttendanceStatusScreen} />
  </Stack.Navigator>
);

const RetailExecutionScreenStack = () => {
  const navigation = useNavigation();
  return (
    <CartProvider>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Retail Execution"
          component={RetailExecutionScreen}
        />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="Outlet Image" component={OutletImage} />
        <Stack.Screen
          name="Inventory Check"
          component={InventoryCheckTaskScreen}
        />
        <Stack.Screen name="Merchandise" component={Merchandise} />
        <Stack.Screen
          name="Order Capture"
          component={OrderTaskScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => {
                  navigation.navigate("CartComponent");
                }}
              >
                <FontAwesome name="shopping-cart" size={30} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="CartComponent" component={CartComponent} />
        <Stack.Screen name="Take Signature" component={TakeSignature} />
        <Stack.Screen
          name="Product Return"
          component={ProductReturnTaskScreen}
        />
        
        
      </Stack.Navigator>
    </CartProvider>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      activeTintColor: "blue",
      inactiveTintColor: "#D3D3D3",
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: "lightgray",
      },
    }}
  >
    <Tab.Screen
      name="Attendance Stack"
      component={AttendanceStack}
      options={{
        tabBarLabel: "Attendance",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="calendar-check-o" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Execution Execution"
      component={RetailExecutionScreenStack}
      options={{
        tabBarLabel: "Execution",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="line-chart" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                alert("sync data");
              }}
            >
              <MaterialCommunityIcons name="sync" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.goBack(); // Handle back navigation
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return <DrawerNavigator />;
};

export default Navigation;
