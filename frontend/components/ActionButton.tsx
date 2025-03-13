import * as React from "react";
import { Colors } from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

import { View, Text, StyleSheet } from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <View style={styles.button} onTouchEnd={onClick}>
      <View style={styles.beforeElement} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 195,
    height: 195,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  beforeElement: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "none",
    borderRadius: 100,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  text: {
    fontSize: 24,
    color: Colors.secondary,
    fontFamily: "Montserrat-Bold",
  },
});