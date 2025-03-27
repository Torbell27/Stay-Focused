import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Keyboard, Platform } from "react-native";
import Header from "@/components/Header";
import RegistrationForm from "@/components/DoctorMain/RegistrationForm";
import PatientList from "@/components/DoctorMain/PatientList";
import Selector from "@/components/Selector";
import FooterButton from "@/components/FooterButton";
import Footer from "@/components/Footer";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { validateForm } from "@/components/ValidateInputs";
import api from "@/scripts/api";
import { storeTokens, getIdFromToken } from '@/scripts/jwt';
import { checkCode } from "@/components/CheckErrorCode";

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
  const [headerUserName, setHeaderUserName] = useState<string>("Имя Ф. О.");
  const [selc, setSelc] = useState<string>("patient_list");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false); 
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); 
  const [error, setError] = useState<string>();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: "",
    secondName: "",
    patronymic: "",
    username: "",
    password: "",
    email: "",
  });

  getIdFromToken()
  .then((userId) => {
    if (userId) 
     api
       .doctorName(userId)
       .then((response) => {
          const { userFirstname, userSurname, userLastname } = response;
          const formattedFirstName = `${userSurname} ${userFirstname[0]}. ${userLastname[0]}.`;
          setHeaderUserName(formattedFirstName);
       })
       .catch((error) => {
         const err = checkCode(error.message);
         setError(err);
       });
    else console.log('Failed to get user Role.');
  })
  .catch((error) => {
    console.error('Error getting user role:', error);
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleRegister = () => {
    const errors = validateForm(registrationData, true);  
    
    const filteredErrors = Object.fromEntries(
      Object.entries(errors).map(([key, value]) => [key, value || ""]) 
    );

    setFormErrors(filteredErrors);  

    if (Object.keys(filteredErrors).length === 0) {
      console.log(registrationData);
    }
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
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <RegistrationForm
                  onFormChange={handleFormChange}
                  errors={formErrors}
              />
               {!isKeyboardVisible && ( 
                <Footer
                  components={[
                    <FooterButton
                      onPress={handleRegister}
                      label="Зарегистрировать"
                      key="1"
                    />,
                  ]}
                />
              )}
          </ScrollView>
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
