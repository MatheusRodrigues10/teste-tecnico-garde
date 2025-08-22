import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        //remove outras telas do historico
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

      {error ? (
        <Text style={{ color: "red", marginVertical: 5 }}>{error}</Text>
      ) : null}

      <View style={{ marginBottom: 10 }}>
        <Button
          title={loading ? "Entrando..." : "Login"}
          onPress={handleLogin}
        />
      </View>

      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
