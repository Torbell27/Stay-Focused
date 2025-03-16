import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import RegistrationForm from "@/components/DoctorMain/RegistrationForm";
import PatientList from "@/components/DoctorMain/PatientList";
import Selector from "@/components/Selector";
import FooterButton from "@/components/FooterButton";
import { Colors } from "@/constants/Colors";

type RegistrationData = {
    firstName: string; 
    secondName: string; 
    patronymic: string; 
    username: string; 
    password: string; 
    email: string; 
};

const DoctorMain: React.FC = () => {
    const [headerUserName, setHeaderUserName] = useState("Иванова И. И."); 
    const [selc, setSelc] = useState<0 | 1>(0);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        firstName: '',
        secondName: '',
        patronymic: '',
        username: '',
        password: '',
        email: ''
    });

    const handleRegister = () => {
        console.log(registrationData); 
    };

    const handleFormChange = (data: RegistrationData) => {
        setRegistrationData(data); 
    };

    return (
        <View style={styles.container}>
            <Header userName={headerUserName} isPatient={true} />

            <View style={styles.content}>
                <Selector 
                    selected={selc}
                    onSelect={setSelc}
                    firstLabel = "Регистрация пациента"
                    secondLabel = "Список пациентов"
                    showLabel = {false}
                    buttonHeight={50}
                />
            </View>

            {selc === 0 && (
                <>
                    <RegistrationForm onFormChange={handleFormChange} />
                    <FooterButton onPress={handleRegister} label="Зарегистрировать" />
                </>
            )}

            {selc === 1 && (
                <View style={styles.list}>
                    <PatientList/>
                </View>
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
    fontFamily: "Montserrat-Regular,sans-serif",
  },
  content:{
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  list:{
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }
});

export default DoctorMain;