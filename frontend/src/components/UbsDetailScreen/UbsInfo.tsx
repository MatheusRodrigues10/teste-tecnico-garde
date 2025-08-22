import React from "react";
import { View, Text } from "react-native";
import { UBSBasic } from "../../types/ubs";

type Props = {
  ubs: UBSBasic;
};

export default function UbsInfo({ ubs }: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
        {ubs.name}
      </Text>
      {ubs.distance !== undefined && (
        <Text>Distância: {ubs.distance.toFixed(2)} km</Text>
      )}
      {ubs.phone && <Text>Telefone: {ubs.phone}</Text>}
    </View>
  );
}
