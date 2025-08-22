import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUBS } from "../redux/ubsSlice";

//components
import UBSItem from "../components/UBSItem";

//types
import { UBSBasic } from "../types/ubs";
import { RootStackParamList } from "../types/navigation";

const UbsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userAddress = useSelector(
    (state: RootState) => state.auth.user?.address
  );
  const { list, loading, error } = useSelector((state: RootState) => state.ubs);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    dispatch(fetchUBS());
  }, [dispatch]);

  const handlePressUBS = (id: number) => {
    navigation.navigate("UbsDetail", { id });
  };

  const renderItem = ({ item }: { item: UBSBasic }) => (
    <UBSItem ubs={item} onPress={handlePressUBS} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Lista de UBS mais próximas de:{" "}
        {userAddress || "Endereço não disponível"}
      </Text>

      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={list || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default UbsScreen;
