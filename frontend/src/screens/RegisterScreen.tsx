import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { formatCep } from "../utils/formatCep";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = () => {
    dispatch(registerUser({ name, email, password, address })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigation.navigate("Login");
        }
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={(text) => setAddress(formatCep(text))}
      />

      {error ? (
        <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
      ) : null}

      <View style={{ marginBottom: 10 }}>
        <Button
          title={loading ? "Cadastrando..." : "Cadastrar"}
          onPress={handleRegister}
        />
      </View>

      <Button title="Logar" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default RegisterScreen;
