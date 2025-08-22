// src/navigation/MainTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import UBSStack from "./UbsStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="UBS"
      component={UBSStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;
