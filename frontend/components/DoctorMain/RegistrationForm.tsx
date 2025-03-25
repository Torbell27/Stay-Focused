import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, Keyboard, 
    TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Colors } from "@/constants/Colors";
import { filterNameText, filterUsernameText, filterPasswordText, 
    filterEmailText, getFieldTooltip } from '@/components/ValidateInputs';
import { Ionicons } from "@expo/vector-icons";
import { useTogglePasswordVisibility, passwordInputStyles } from "@/hook/PasswordVisibility";
import TextField from '@/components/TextInputCustom';

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
    const [focusedInput, setFocusedInput] = useState<keyof RegistrationData | null>(null);
    const [fields, setFields] = useState<RegistrationData>({
        firstName: "",
        secondName: "",
        patronymic: "",
        username: "",
        password: "",
        email: "",
    });

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    useEffect(() => {
        onFormChange(fields);
    }, [fields]);

    const validationMap = {
        firstName: filterNameText,
        secondName: filterNameText,
        patronymic: filterNameText,
        username: filterUsernameText,
        password: filterPasswordText,
        email: filterEmailText,
    };
    
    const handleChange = (field: keyof RegistrationData) => (text: string) => {
        const validate = validationMap[field];
        if (validate(text)) {
            setFields(prev => ({ ...prev, [field]: text }));
        }
    };

    const renderInput = (
        field: keyof RegistrationData,
        placeholder: string,
        validate: (text: string) => boolean,
        secureTextEntry: boolean = false
    ) => {
        const isPasswordField = field === 'password';
        const showTooltip = focusedInput === field;
        const tooltipText = getFieldTooltip(field);

        return (
            <View style={styles.inputContainer}>
                <TextField
                    label={placeholder}
                    value={fields[field]}
                    onChangeText={handleChange(field)}
                    onFocus={() => setFocusedInput(field)}
                    secureTextEntry={isPasswordField ? passwordVisibility : false}
                    errorText={errors[field] || null}
                />
                {isPasswordField && (
                    <Pressable 
                        onPress={handlePasswordVisibility} 
                        style={passwordInputStyles.iconButton}
                        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                        <Ionicons name={rightIcon} size={24} color={Colors.secondary} />
                    </Pressable>
                )}
                {showTooltip && tooltipText && (
                    <Text style={styles.tooltip}>
                        {tooltipText}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
                    <ScrollView>
                        {renderInput("firstName", "Имя", filterNameText)}
                        {renderInput("secondName", "Фамилия", filterNameText)}
                        {renderInput("patronymic", "Отчество", filterNameText)}
                        {renderInput("username", "Логин", filterUsernameText)}
                        {renderInput("password", "Пароль", filterPasswordText, true)}
                        {renderInput("email", "Email", filterEmailText)}
                    </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        fontFamily: "Montserrat-Regular",
        
    },
    inputContainer: {
        marginTop: 15, 
    },
    tooltip: {
        fontFamily: "Montserrat-Regular",
        color: "#2A2A2A",
        fontSize: 12,
        alignContent: 'center',
        paddingLeft: 12,
        paddingTop: 10,
    },
});

export default RegistrationForm;
