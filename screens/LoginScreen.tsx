import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { styles } from '../themes/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormLogin {
    email: string;
    password: string;
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

export const LoginScreen = () => {
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: "",
        password: ""
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    const navigation = useNavigation();

    const handleSetValues = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value });
    };

    const handleLogin = async () => {
        if (!formLogin.email || !formLogin.password) {
            setShowMessage({
                visible: true,
                message: "Completa tus Datos!!!",
                color: '#d93c0e'
            });
            return;
        }

        try {
            const response = await signInWithEmailAndPassword(auth, formLogin.email, formLogin.password);
            setShowMessage({
                visible: true,
                message: 'Inicio de Sesión Exitoso!',
                color: '#581f73'
            });
        } catch (error) {
            console.log(error);
            setShowMessage({
                visible: true,
                message: 'Correo y/o contrasenia incorrecta',
                color: '#d93c0e'
            })
        }
    };

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Iniciar Sesión</Text>
            <TextInput
                label="Correo"
                mode="outlined"
                placeholder="Escribe tu correo"
                onChangeText={(value) => handleSetValues('email', value)}
            />
            <TextInput
                label="Contraseña"
                mode="outlined"
                placeholder="Escribe tu contraseña"
                secureTextEntry
                onChangeText={(value) => handleSetValues('password', value)}
            />
            <Button mode="contained" onPress={handleLogin}>
                Iniciar Sesión
            </Button>
            <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register'}))}
            >No tienes una cuenta? Registrate</Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ ...styles.message, backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </View>
    );
};
