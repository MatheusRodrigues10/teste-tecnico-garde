import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUBS } from "../redux/ubsSlice";
import { RootState, AppDispatch } from "../redux/store";
import UBSItem from "../components/UBSItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { UBSBasic } from "../types/ubs";

type RootStackParamList = {
  UbsDetail: { id: number };
};

const UbsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.ubs);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Buscar UBS
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
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
        Lista de UBS
      </Text>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

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

export default UbsScreen;
