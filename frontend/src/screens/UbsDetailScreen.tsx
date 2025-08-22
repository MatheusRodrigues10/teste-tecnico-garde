import React, { useEffect } from "react";
import { ScrollView, ActivityIndicator, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUBSById } from "../redux/ubsSlice";

import { UbsInfo, UbsAddress } from "../components/UbsDetailScreen";

type RootStackParamList = {
  UbsDetail: { id: number };
};

type UbsDetailRouteProp = RouteProp<RootStackParamList, "UbsDetail">;

export default function UbsDetailScreen() {
  const route = useRoute<UbsDetailRouteProp>();
  const { id } = route.params;

  const dispatch = useDispatch<any>();
  const { selected, loading, error } = useSelector((state: any) => state.ubs);

  useEffect(() => {
    dispatch(fetchUBSById(id));
  }, [id]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={{ color: "red", padding: 20 }}>{error}</Text>;
  if (!selected)
    return <Text style={{ padding: 20 }}>UBS não encontrada.</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <UbsInfo ubs={selected} />
      <UbsAddress address={selected.address} />
    </ScrollView>
  );
}
