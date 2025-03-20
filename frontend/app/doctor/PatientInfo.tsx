import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterButton from "@/components/FooterButton";
import { Colors } from "@/constants/Colors";
import PatientInfoField from "@/components/PatientInfo/PatientInfoField";

const PatientInfo = () => {
  const router = useRouter();
  const [patientName, setPatientName] = useState("Смирнова Н. В.");

  const patientData = {
    login: "smirnova",
    email: "smirnova@mail.com",
  };

  const handleBack = () => {
    router.back();
  };

  const handlePatientStatistics = () => {
    console.log("Navigate to patient statistics");
  };

  const handlePatientAssignments = () => {
    console.log("Navigate to patient assignments");
  };

  return (
    <View style={styles.container}>
      <Header title={patientName} createBackButton={true} />

      <View style={styles.content}>

        <View style={styles.infoContainer}>
          <PatientInfoField
            label="Логин"
            value={patientData.login}
            iconSource={{
              uri: "https://cdn.builder.io/api/v1/image/assets/f48f5e8ac2544e658b3a1ab1fbecb356/254ea9f9ee8f746e53a42125f2a79d6f874ff15d?placeholderIfAbsent=true",
            }}
            hasDropdown={true}
          />

          <PatientInfoField
            label="Пароль"
            value="che!smotrish"
            iconSource={{
              uri: "https://cdn.builder.io/api/v1/image/assets/f48f5e8ac2544e658b3a1ab1fbecb356/002d3dac0175885e6893f928f8c4e08cb4cd3690?placeholderIfAbsent=true",
            }}
            isPassword={true}
          />

          <PatientInfoField
            label="Почта"
            value={patientData.email}
            iconSource={{
              uri: "https://cdn.builder.io/api/v1/image/assets/f48f5e8ac2544e658b3a1ab1fbecb356/0bef21a445fe764458e719223774049d02a89bd7?placeholderIfAbsent=true",
            }}
          />
        </View>
      </View>

      <Footer
        components={[
          <FooterButton
            key="statistics"
            onPress={handlePatientStatistics}
            label="Статистика пациента"
          />,
          <FooterButton
            key="assignments"
            onPress={handlePatientAssignments}
            label="Задания пациента"
          />,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundScreen,
    borderRadius: 12,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  infoContainer: {
    backgroundColor: Colors.primary,
    width: "100%",
    padding: 7,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PatientInfo;
