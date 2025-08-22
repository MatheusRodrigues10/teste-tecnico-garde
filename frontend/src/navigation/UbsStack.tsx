import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UbsScreen from "../screens/UbsScreen";
import UbsDetailScreen from "../screens/UbsDetailScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const UbsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UbsList"
      component={UbsScreen}
      options={{ title: "UBS" }}
    />
    <Stack.Screen
      name="UbsDetail"
      component={UbsDetailScreen}
      options={{ title: "Detalhes da UBS" }}
    />
  </Stack.Navigator>
);

export default UbsStack;
