import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet} from 'react-native';
import { Colors } from "@/constants/Colors";

interface RegistrationData {
    firstName: string; 
    secondName: string; 
    patronymic: string;
    username: string; 
    password: string; 
    email: string; 
}

interface RegistrationFieldsProps {
    onFormChange: (data: RegistrationData) => void; 
}

const RegistrationForm: React.FC<RegistrationFieldsProps> = ({ onFormChange }) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    useEffect(() => {
        const registrationData: RegistrationData = { 
            firstName, 
            secondName, 
            patronymic, 
            username, 
            password, 
            email 
        };
        onFormChange(registrationData); 
    }, [firstName, secondName, patronymic, username, password, email]);

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, focusedInput === 'firstName' ? styles.focusedInput : {}]}
                placeholder="Имя" 
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setFocusedInput('firstName')}
                onBlur={() => setFocusedInput(null)}
            />
            <TextInput
                style={[styles.input, focusedInput === 'secondName' ? styles.focusedInput : {}]}
                placeholder="Фамилия" 
                value={secondName}
                onChangeText={setSecondName}
                onFocus={() => setFocusedInput('secondName')}
                onBlur={() => setFocusedInput(null)}
            />
            <TextInput
                style={[styles.input, focusedInput === 'patronymic' ? styles.focusedInput : {}]}
                placeholder="Отчество" 
                value={patronymic}
                onChangeText={setPatronymic}
                onFocus={() => setFocusedInput('patronymic')}
                onBlur={() => setFocusedInput(null)}
            />
            <TextInput
                style={[styles.input, focusedInput === 'username' ? styles.focusedInput : {}]}
                placeholder="Логин" 
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
            />
            <TextInput
                style={[styles.input, focusedInput === 'password' ? styles.focusedInput : {}]}
                placeholder="Пароль" 
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
            />
            <TextInput
                style={[styles.input, focusedInput === 'email' ? styles.focusedInput : {}]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        backgroundColor: Colors.primary, 
        borderColor: Colors.border,
        color: Colors.inputInactiveText,
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    focusedInput: {
        borderColor: Colors.main, 
        color: "#2A2A2A",
    },
});

export default RegistrationForm;
