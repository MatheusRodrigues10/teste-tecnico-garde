import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

//redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";

//utils
import { formatCep, validateEmail, validatePassword } from "../utils";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = () => {
    //Validações
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      alert(emailError || passwordError); //mostra o primeiro erro encontrado
      return;
    }

    dispatch(registerUser({ name, email, password, address })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Endereço (CEP)"
        value={address}
        onChangeText={(text) => setAddress(formatCep(text))}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Cadastrando..." : "Cadastrar"}
          onPress={handleRegister}
        />
      </View>

      <Button
        title="Logar"
        onPress={() => {
          dispatch(resetError());
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

const styles = {
  container: {
    padding: 20,
  },
  error: {
    color: "red",
    marginVertical: 5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
};

export default RegisterScreen;
