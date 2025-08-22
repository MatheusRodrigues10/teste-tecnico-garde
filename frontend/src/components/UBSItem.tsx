import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { UBSBasic } from "../types/ubs";

type UBSItemProps = {
  ubs: UBSBasic;
  onPress: (id: number) => void;
};

export default function UBSItem({ ubs, onPress }: UBSItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(ubs.id)}>
      <Text style={styles.name}>{ubs.name}</Text>
      {ubs.distance !== undefined ? (
        <Text style={styles.distance}>{ubs.distance.toFixed(2)} km</Text>
      ) : (
        <Text style={styles.distance}>-</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  distance: {
    color: "#666",
    marginTop: 4,
  },
});
