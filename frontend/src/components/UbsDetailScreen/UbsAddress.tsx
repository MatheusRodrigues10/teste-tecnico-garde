import React from "react";
import { View, Text } from "react-native";
import { UBSAddressBasic } from "../../types/ubs";

type Props = {
  address: UBSAddressBasic;
};

export default function UbsAddress({ address }: Props) {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Endereço:</Text>
      <Text>
        {address.road}, {address.house_number || ""}{" "}
        {address.suburb ? `- ${address.suburb}` : ""}, {address.city} -{" "}
        {address.state}
      </Text>
      {address.postcode && <Text>CEP: {address.postcode}</Text>}
      {address.country && <Text>País: {address.country}</Text>}
    </View>
  );
}
