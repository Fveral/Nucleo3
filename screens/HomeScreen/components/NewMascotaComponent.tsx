import React, { useState } from 'react';
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../../../themes/styles';
import { View } from 'react-native';
import { database } from '../../../config/Config';
import { push, ref, set } from 'firebase/database';

interface Props {
    showModalMascota: boolean;
    setShowModalMascota: Function;
}

interface ShowMessage {
    visible: boolean;
    message: string;
    color: string;
}

interface FormMascota {
    id: string;
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    dueno: string;
    contactoDueno: string;
    historialMedico: string;
}

export const NewMascotaComponent = ({showModalMascota, setShowModalMascota}: Props) => {
    const[formMascota, setFormMascota] = useState<FormMascota>({
        id: '',
        nombre: '',
        especie: '',
        raza: '',
        edad: 0,
        dueno: '',
        contactoDueno: '',
        historialMedico: ''

    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    });

    const handleSetValues = (key: string, value: string) => {
        setFormMascota({ ...formMascota, [key]: value});
    }

    const handleSaveMascota = async () => {
        if(!formMascota.id || !formMascota.nombre || !formMascota.especie || !formMascota.raza || !formMascota.edad || !formMascota.dueno || !formMascota.contactoDueno || !formMascota.historialMedico) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los Campos!!',
                color: '#7a0808'
            });
            return;
        }
        const dbRef = ref (database, 'mascotas');
        const saveMascota = push(dbRef);
        try {
            await set(saveMascota, formMascota);
            setShowModalMascota(false);
        } catch (error) {
            console.log(error);
        }
        
    } 


  return (
    <>
        <Portal>
            <Modal visible={showModalMascota} contentContainerStyle={styles.modal}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant='headlineSmall'>Nueva Mascota</Text>
                    <View style={styles.iconProfile}>
                        <IconButton
                                icon="close-circle-outline"
                                size={30}
                                mode='contained'
                                onPress={() => setShowModalMascota(false)}
                            />
                    </View>
                </View>
                <Divider/>
                <TextInput
                    label='codigo'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('id', value)}
                />
                <TextInput
                    label='Nombre'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('nombre', value)}
                />
                <TextInput
                    label='Especie'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('especie', value)}
                />
                <TextInput
                    label='Raza'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('raza', value)}
                />
                <TextInput
                    label='Edad'
                    mode='outlined'
                    keyboardType='numeric'
                    onChangeText={(value) => handleSetValues('edad', value)}
                />
                <TextInput
                    label='Dueno'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('dueno', value)}
                />
                <TextInput
                    label='Contacto Dueno'
                    mode='outlined'
                    onChangeText={(value) => handleSetValues('contactoDueno', value)}
                />
                <TextInput
                    label='Historial Medico'
                    mode='outlined' 
                    onChangeText={(value) => handleSetValues('historialMedico', value)}
                />
                <Button mode='contained' onPress={handleSaveMascota}>Agregar</Button>
            </Modal>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ ...styles.message, backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </Portal>
    </>
  )
}

export default NewMascotaComponent;
