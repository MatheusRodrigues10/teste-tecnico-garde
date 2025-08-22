import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../services/api";

const UbsScreen = () => {
  const [ubsList, setUbsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchUBS = async () => {
      try {
        const res = await api.get("/ubs");
        setUbsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUBS();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Lista de UBS</Text>
      <FlatList
        data={ubsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.name} - {item.distance} km
          </Text>
        )}
      />
    </View>
  );
};

export default UbsScreen;
