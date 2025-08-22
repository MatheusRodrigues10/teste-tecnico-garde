import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  // Sair
  const handleLogout = () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.navigate("Login" as never);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sair" onPress={handleLogout} color="#2a9d8f" />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 30 },
  buttonContainer: { width: "80%", marginVertical: 10 },
});
