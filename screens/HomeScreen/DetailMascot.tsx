import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { styles } from '../../themes/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Mascota } from './HomeScreen'
import { database } from '../../config/Config'
import { ref, update } from 'firebase/database'

  const DetailMascot = () => {
    const route = useRoute();
    //@ts-ignore
    const {mascot} = route.params;
    const navigation = useNavigation();

    const[formEdit, setFormEdit] = useState<Mascota>({
        id: '',
        nombre: '',
        especie: '',
        raza: '',
        edad: 0,
        dueno: '',
        contactoDueno: '',
        historialMedico: ''
    });

    useEffect(() => {
        setFormEdit(mascot);
    }, []);

    const handleSetValues = (key: string, value: string) => {
        setFormEdit({...formEdit, [key]: value})
    }

    const handleUpdateMascot = async () => {
        const dbRef = ref(database, 'mascotas/'+formEdit.id);
        try {
            await update(dbRef, {
                edad: formEdit.edad,
                historialMedico: formEdit.historialMedico,
                contactoDueno: formEdit.contactoDueno,         
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <View style={styles.rootDetail}>
            <Text style={styles.title}>Detalle de la Mascota</Text>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.nombre}
                        onChangeText={(value) => handleSetValues('nombre', value)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Especie:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.especie}
                        onChangeText={(value) => handleSetValues('especie', value)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Raza:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.raza}
                        onChangeText={(value) => handleSetValues('raza', value)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Edad:</Text>
                    <TextInput
                        style={styles.input}
                        value={String(formEdit.edad)}
                        onChangeText={(value) => handleSetValues('edad', (value))}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.dueno}
                        onChangeText={(value) => handleSetValues('dueno', value)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.contactoDueno}
                        onChangeText={(value) => handleSetValues('contactoDueno', value)}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Historial Médico:</Text>
                    <TextInput
                        style={styles.input}
                        value={formEdit.historialMedico}
                        onChangeText={(value) => handleSetValues('historialMedico', value)}
                    />
                </View>
            </View>
            <Button
                style={styles.button}
                mode='contained'
                icon='update'
                onPress={handleUpdateMascot}>
                Actualizar
            </Button>
            <Button
                style={styles.button}
                mode='contained'
                icon='delete-empty-outline'
                onPress={() => {

                }}>
                Eliminar
            </Button>
        </View>
    )
}
export default DetailMascot;