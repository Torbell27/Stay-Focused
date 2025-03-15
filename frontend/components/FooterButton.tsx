import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface FooterButtonProps {
  onPress: () => void;
  label: string;
}

const FooterButton: React.FC<FooterButtonProps> = ({ onPress, label }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.main,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default FooterButton;
