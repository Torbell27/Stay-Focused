import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface FooterProps {
  components: Array<ReactNode>;
}

const Footer: React.FC<FooterProps> = ({ components }) => {
  return <View style={styles.container}>{components}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: "auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
  },
});

export default Footer;
