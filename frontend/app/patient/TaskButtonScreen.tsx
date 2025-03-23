import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActionButton } from "@/components/TaskButtonScreen/ActionButton";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

interface BlockProps {
  title: string;
  value: string;
}

const Block: React.FC<BlockProps> = ({ title, value }) => (
  <View style={styles.block}>
    <Text style={[styles.upperText, { color: Colors.headerText }]}>{title}</Text>
    <Text style={[styles.lowerText, { color: Colors.main }]}>{value}</Text>
  </View>
);

export default function ButtonPage() {
  return (
    <View style={styles.container}>
      <Header title="10:00" createBackButton />
      <View style={styles.blocksContainer}>
        <Block title="Серия" value="1" />
        <Block title="Задание" value="начато" />
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton label="Нажать" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 16 },
  blocksContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  block: {
    backgroundColor: "#FFFFFF", borderColor: Colors.secondary, borderWidth: 1, borderRadius: 16,
    padding: 16, width: "48%", alignItems: "center", justifyContent: "center"
  },
  upperText: { fontSize: 18, fontFamily: "Montserrat-SemiBold", textAlign: "center" },
  lowerText: { fontSize: 30, fontFamily: "Montserrat-Bold", textAlign: "center", marginTop: 4 },
  buttonContainer: { position: "absolute", bottom: 40, alignItems: "center", left: 0, right: 0 }
});
