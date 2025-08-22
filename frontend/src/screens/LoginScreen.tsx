import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

//redux
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError } from "../redux/authSlice";

//utils
import { validateEmail, validatePassword } from "../utils";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    //Validações
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      alert(emailError || passwordError); //mostra o primeiro erro encontrado
      return;
    }

    dispatch(loginUser({ email, password })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && (
        <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
      )}

      <View style={{ marginBottom: 10 }}>
        <Button
          title={loading ? "Entrando..." : "Login"}
          onPress={handleLogin}
        />
      </View>

      <Button
        title="Cadastrar"
        onPress={() => {
          dispatch(resetError());
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

export default LoginScreen;
