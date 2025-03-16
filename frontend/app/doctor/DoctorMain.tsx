import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import RegistrationForm from "@/components/DoctorMain/RegistrationForm";
import PatientList from "@/components/DoctorMain/PatientList";
import Selector from "@/components/Selector";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

type RegistrationData = {
  firstName: string;
  secondName: string;
  patronymic: string;
  username: string;
  password: string;
  email: string;
};

const DoctorMain: React.FC = () => {
  const router = useRouter();
  const [headerUserName, setHeaderUserName] = useState<string>("Иванова И. И.");
  const [selc, setSelc] = useState<string>("patient_list");
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: "",
    secondName: "",
    patronymic: "",
    username: "",
    password: "",
    email: "",
  });

  const handleRegister = () => {
    console.log(registrationData);
  };

  const handleFormChange = (data: RegistrationData) => {
    setRegistrationData(data);
  };

  const handleLogout = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Header
        title={headerUserName}
        createBackButton={false}
        logoutFunc={handleLogout}
      />

      <View style={styles.content}>
        <Selector
          selected={selc}
          onSelect={setSelc}
          keys={{
            patient_list: "Список пациентов",
            patient_registration: "Регистрация пациента",
          }}
          buttonHeight={50}
        />
      </View>

      {selc === "patient_list" && (
        <View style={styles.list}>
          <PatientList />
        </View>
      )}

      {selc === "patient_registration" && (
        <>
          <RegistrationForm onFormChange={handleFormChange} />
          <Footer
            components={[
              <FooterButton
                onPress={handleRegister}
                label="Зарегистрировать"
                key="1"
              />,
            ]}
          ></Footer>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: Colors.backgroundScreen,
    flex: 1,
    fontFamily: "Montserrat-Regular",
  },
  content: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default DoctorMain;
