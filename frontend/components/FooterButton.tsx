import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FooterButtonProps {
  onPress: () => void;
  label: string;
}

const FooterButton: React.FC<FooterButtonProps> = ({ onPress, label }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: "auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
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
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold,sans-serif",
  },
});

export default FooterButton;
