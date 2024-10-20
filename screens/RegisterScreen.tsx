import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { styles } from '../themes/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormRegister {
    email: string,
    password: string
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

export const RegisterScreen = () => {
    const [formRegister, setformRegister] = useState<FormRegister>({
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
        setformRegister({...formRegister, [key]: value }); 
    }

    const handleRegister = async () => {
        if(!formRegister.email || !formRegister.password) {
            setShowMessage({
                visible: true,
                message: "Datos en el Formulario Incompletos!!!",
                color: '#d93c0e'
            });
            return;
        }
        console.log(formRegister);
        try {
            const response = await createUserWithEmailAndPassword(auth, formRegister.email, formRegister.password);
            setShowMessage({
                visible: true,
                message: 'Registro Exitoso!',
                color: '#581f73'
            })
        } catch (error) {
            console.log(error)
            setShowMessage({
                visible: true,
                message: "Error al Registrarse!!!",
                color: '#d93c0e'
            });
        }
    }

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Registro</Text>
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
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(value) => handleSetValues('password', value)}
            />
            <Button mode="contained" onPress={handleRegister}>
                Registrate
            </Button>
            <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login'}))}
            >Ya tienes una cuenta, Login</Text>
            <Snackbar
            visible={showMessage.visible}
            onDismiss={() => setShowMessage({...showMessage, visible: false})}
            style={{...styles.message, backgroundColor: showMessage.color}}>
            {showMessage.message}
            </Snackbar>
   
        </View>
    
    )
}
