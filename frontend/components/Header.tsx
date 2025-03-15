import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

const BackButton = () => {
  return (
    <Svg viewBox="0 0 320 512" style={styles.backButton}>
      <Path
        fill={Colors.main}
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
      />
    </Svg>
  );
};

const LogoutButton = () => {
  return (
    <Svg viewBox="0 0 512 512" style={styles.backButton}>
      <Path
        fill={Colors.main}
        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l73.4 73.4H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128v256c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64z"
      />
    </Svg>
  );
};

interface HeaderProps {
  title: string;
  createBackButton?: boolean;
  logoutFunc?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  createBackButton = true,
  logoutFunc = null,
}) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.backButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={router.back}
            style={{ display: createBackButton ? "flex" : "none" }}
          >
            <BackButton />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <View style={styles.backButton}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (logoutFunc) logoutFunc();
            }}
            style={{ display: logoutFunc ? "flex" : "none" }}
          >
            <LogoutButton />
          </TouchableOpacity>
        </View>
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
    position: "relative",
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    textAlign: "center",
  },
  backButton: {
    width: 28,
    height: 28,
  },
  title: {
    justifyContent: "center",
    fontSize: 24,
    color: Colors.headerText,
    fontFamily: "Montserrat-SemiBold",
    margin: "auto",
    textAlign: "center",
    flex: 1,
  },
});

export default Header;
