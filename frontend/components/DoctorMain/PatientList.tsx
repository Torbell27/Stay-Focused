import React, { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = require("@/components/DoctorMain/patients.json");
      setPatients(data);
      setLoading(false);
    } catch (error) {
      setError("Ошибка загрузки данных");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Ошибка: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={patients}
        contentContainerStyle={{ gap: 12 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {item.firstName} {item.lastName} {item.patronymic}
              </Text>
            </View>
            <AntDesign name="right" size={24} color={Colors.secondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  item: {
    flexShrink: 1,
    minHeight: 75,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.primary,
    borderColor: Colors.border,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: Colors.headerText,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default PatientList;
