import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

const BackButton = () => {
  return (
    <Svg viewBox="0 0 320 512" style={styles.userIcon}>
      <Path
        fill={Colors.main}
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
      />
    </Svg>
  );
};

interface HeaderProps {
  userName: string;
  isPatient: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, isPatient }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={router.back}>
          <BackButton />
        </TouchableOpacity>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 10000,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userIcon: {
    width: 20,
    height: 20,
  },
  userName: {
    fontSize: 24,
    color: Colors.headerText,
    fontFamily: "Montserrat-SemiBold,sans-serif",
  },
});

export default Header;
