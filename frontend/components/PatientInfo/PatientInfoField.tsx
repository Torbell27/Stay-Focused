import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Clipboard,
  Alert,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface PatientInfoFieldProps {
  label: string;
  value: string;
  iconSource: ImageSourcePropType;
  isPassword?: boolean;
  hasDropdown?: boolean;
}

const PatientInfoField: React.FC<PatientInfoFieldProps> = ({
  label,
  value,
  iconSource,
  isPassword = false,
  hasDropdown = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getMaskedPassword = (password: string) => {
    return password.replace(/./g, "*");
  };

  const displayValue =
    isPassword && !showPassword ? getMaskedPassword(value) : value;

  const copyToClipboard = () => {
    Clipboard.setString(value);

    if (Platform.OS === "android") {
      ToastAndroid.show("Скопировано в буфер обмена", ToastAndroid.SHORT);
    } else {
      Alert.alert("Скопировано", "Текст скопирован в буфер обмена");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldContent}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{displayValue}</Text>
          {hasDropdown && <View style={styles.dropdown} />}
        </View>

        <View style={styles.actionsContainer}>
          {isPassword && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.actionButton}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? "Hide password" : "Show password"
              }
            >
              <Text style={styles.actionButtonText}>
                {showPassword ? "Скрыть" : "Показать"}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={copyToClipboard}
            accessibilityRole="button"
            accessibilityLabel={`Copy ${label} to clipboard`}
          >
            <Image
              source={iconSource}
              style={styles.icon}
              resizeMode="contain"
              accessibilityLabel={`${label} icon`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(191, 203, 216, 1)",
    paddingVertical: 15,
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    marginTop: 32,
  },
  fieldContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  valueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  value: {
    fontSize: 14,
    color: "rgba(42, 42, 42, 1)",
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
  },
  icon: {
    width: 16,
    height: 16,
  },
  label: {
    position: "absolute",
    top: -18,
    left: 8,
    fontSize: 15,
    color: Colors.inputInactiveText,
    fontWeight: "400",
    fontFamily: "Montserrat-Regular",
    paddingHorizontal: 8,
  },
  dropdown: {
    width: 40,
    height: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionButtonText: {
    color: Colors.main,
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
  },
});

export default PatientInfoField;
