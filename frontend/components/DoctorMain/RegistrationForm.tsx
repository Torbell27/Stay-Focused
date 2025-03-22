import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, 
    KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Colors } from "@/constants/Colors";
import { filterNameText, filterUsernameText, filterPasswordText, 
    filterEmailText, getFieldTooltip } from '@/components/ValidateInputs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility, passwordInputStyles } from "@/hook/PasswordVisibility";


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
    errors: { [key: string]: string }; 
    }
    
    const RegistrationForm: React.FC<RegistrationFieldsProps> = ({ onFormChange, errors }) => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const [fields, setFields] = useState({
        firstName: "",
        secondName: "",
        patronymic: "",
        username: "",
        password: "",
        email: "",
    });
    
    useEffect(() => {
        onFormChange(fields);  
    }, [fields]);

    const getInputStyle = (field: string) => {
        return [
            styles.input,
            (errors[field] && styles.inputError), 
            (focusedInput === field && styles.focusedInput) 
          ];
        };
    
    useEffect(() => {
        if (focusedInput) {
        setTooltip(getFieldTooltip(focusedInput));  
        }
    }, [focusedInput]); 
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>  
        {tooltip && <Text style={styles.tooltip}>{tooltip}</Text>}
            <ScrollView>
                <TextInput
                    style={getInputStyle("firstName")}
                    placeholder="Имя"
                    onFocus={() => setFocusedInput('firstName')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => setFields((prev) => ({ ...prev, firstName: filterNameText(text) }))}
                    value={fields.firstName}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            
                <TextInput
                    style={getInputStyle("secondName")}
                    placeholder="Фамилия"
                    onFocus={() => setFocusedInput('secondName')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => setFields((prev) => ({ ...prev, secondName: filterNameText(text) }))}
                    value={fields.secondName}
                />
                {errors.secondName && <Text style={styles.errorText}>{errors.secondName}</Text>}
            
                <TextInput
                    style={getInputStyle("patronymic")}
                    placeholder="Отчество"
                    onFocus={() => setFocusedInput('patronymic')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => setFields((prev) => ({ ...prev, patronymic: filterNameText(text) }))}
                    value={fields.patronymic}
                />
                {errors.patronymic && <Text style={styles.errorText}>{errors.patronymic}</Text>}
            
                <TextInput
                    style={getInputStyle("username")}
                    placeholder="Логин"
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => setFields((prev) => ({ ...prev, username: filterUsernameText(text) }))}
                    value={fields.username}
                />
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                <View style={passwordInputStyles.passwordContainer}>
                    <TextInput
                        style={getInputStyle("password")}
                        placeholder="Пароль"
                        secureTextEntry={passwordVisibility}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        onChangeText={(text) => setFields({ ...fields,  password: filterPasswordText(text) })}
                        value={fields.password}
                    />
                    <Pressable onPress={handlePasswordVisibility} style={passwordInputStyles.iconButton}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                    </Pressable>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            
                <TextInput
                    style={getInputStyle("email")}
                    placeholder="Email"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={(text) => setFields((prev) => ({ ...prev, email: filterEmailText(text) }))}
                    value={fields.email}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </ScrollView>
        </KeyboardAvoidingView>
    );
    };

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
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
    tooltip: {
        fontFamily: "Montserrat-SemiBold",
        color: 'gray',
        fontSize: 12,
        marginTop: 15,
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
        paddingHorizontal: 5,
        position: 'relative',
    },
   
});

export default RegistrationForm;
