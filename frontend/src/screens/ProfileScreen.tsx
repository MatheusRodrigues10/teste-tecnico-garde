import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  // Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.userName}>
        {user?.name ? `Olá, ${user.name}` : "Usuário não disponível"}
      </Text>

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
  title: { fontSize: 24, marginBottom: 20, fontWeight: "bold" },
  userName: { fontSize: 20, marginBottom: 30 },
  buttonContainer: { width: "80%", marginVertical: 10 },
});
