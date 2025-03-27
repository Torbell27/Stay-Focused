import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import {
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  useTogglePasswordVisibility,
  passwordInputStyles,
} from "@/hooks/PasswordVisibility";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import TextField from "@/components/TextInputCustom";
import { validateForm } from "@/components/ValidateInputs";
import { checkCode } from "@/components/CheckErrorCode";
import api from "@/scripts/api";
import { useRouter } from "expo-router";
import { storeTokens, getRoleFromToken } from '@/scripts/jwt';

type AuthorizationData = {
  username: string;
  password: string;
};

interface RegistrationFieldsProps {
  errors: { [key: string]: string };
}

interface DecodedToken {
  userId: string;
  userRole: string;
  exp: number;
}

const AuthorizationForm: React.FC<RegistrationFieldsProps> = ({
  errors = {},
}) => {
  const router = useRouter();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>();
  const [authorizationData, setAuthorizationData] = useState<AuthorizationData>(
    {
      username: "",
      password: "",
    }
  );

  const handleChange = (field: keyof AuthorizationData) => (text: string) => {
    setAuthorizationData((prev) => ({ ...prev, [field]: text }));
  };

  const handleAuthorize = async () => {
    setError("");
    const errors = validateForm(authorizationData, false);

    const filteredErrors = Object.fromEntries(
      Object.entries(errors).map(([key, value]) => [key, value || ""])
    );

    setFormErrors(filteredErrors);

    if (Object.keys(filteredErrors).length === 0) {
      api
        .auth(authorizationData)
        .then((response) => {
          const { accessToken, refreshToken } = response;
          storeTokens(accessToken, refreshToken);
          getRoleFromToken()
            .then((userRole) => {
              if (userRole != undefined || userRole != null) userRole == 0 ? router.push("/doctor/DoctorMain") : router.push("/patient/TaskInfoScreen")
              else console.log('Failed to get user Role.');
            })
            .catch((error) => {
              console.error('Error getting user role:', error);
            });
        })
        .catch((error) => {
          const err = checkCode(error.message);
          setError(err);
        });
    } else {
      console.log("Validation errors:", filteredErrors);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Авторизация"} createBackButton={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.formContainer}
      >
        <ScrollView contentContainerStyle={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextField
              label="Логин"
              value={authorizationData.username}
              onChangeText={handleChange("username")}
              errorText={formErrors.username || errors.username || null}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextField
              label="Пароль"
              value={authorizationData.password}
              onChangeText={handleChange("password")}
              errorText={formErrors.password || errors.password || null}
              secureTextEntry={passwordVisibility}
            />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable
              onPress={handlePasswordVisibility}
              style={passwordInputStyles.iconButton}
              hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
            >
              <Ionicons name={rightIcon} size={24} color={Colors.secondary} />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer
        components={[
          <FooterButton onPress={handleAuthorize} label="Войти" key="1" />,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 15,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 5,
    color: "red",
  },
});

export default AuthorizationForm;
