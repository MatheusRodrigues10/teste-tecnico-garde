import { useEffect } from "react";
import { ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppDispatch, RootState } from "../redux/store";
import { fetchUBSById } from "../redux/ubsSlice";
import { UbsInfo, UbsAddress } from "../components/UbsDetailScreen";

type RootStackParamList = {
  UbsDetail: { id: number };
};

type Props = NativeStackScreenProps<RootStackParamList, "UbsDetail">;

export default function UbsDetailScreen({ route }: Props) {
  const { id } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const { selected, loading, error } = useSelector(
    (state: RootState) => state.ubs
  );

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
