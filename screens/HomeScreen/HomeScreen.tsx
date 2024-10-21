import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../themes/styles';
import { auth, database } from '../../config/Config';
import firebase, { signOut } from '@firebase/auth';
import { updateProfile } from '@firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { MascotaCardComponent } from './components/MascotaCardComponent';
import NewMascotaComponent from './components/NewMascotaComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormUser {
    name: string;
}

export interface Mascota {
    id: string;
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    dueno: string;
    contactoDueno: string;
    historialMedico: string;
}

export const HomeScreen = () => {
    const navigation = useNavigation();

    const[formUser, setFormUser] = useState<FormUser>({
        name: ""
    });

    const[showModalProfile, setShowModalProfile] = useState<boolean>(false);
    const[showModalMascota, setShowModalMascota] = useState<boolean>(false);
    const[userData, setUserData] = useState<firebase.User | null>(null);
    const[mascotas, setMascotas] = useState<Mascota[]>([])

    useEffect(() => {
        setUserData(auth.currentUser);
        setFormUser({name: auth.currentUser?.displayName ?? ''})
        getAllProducts();
    }, []);

    const handleSetValues=(key: string, value: string) => {
        setFormUser({...formUser, [key]: value})
    }

    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!, 
                {displayName: formUser.name}
            )
        } catch(error) {
            console.log(error);
        }
        setShowModalProfile(false);
    }

    const getAllProducts = () => {
        const dbRef = ref(database, 'mascotas/' + auth.currentUser?.uid);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if(!data) return;
            const getKeys = Object.keys(data);
            const listMascotas: Mascota[] = [];
            getKeys.forEach((key) => {
                const value={...data[key], id: key}
                listMascotas.push(value);
            });
            setMascotas(listMascotas);
        })
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.dispatch(CommonActions.reset({index:0, routes:[{name:'Login'}]}));
            setShowModalProfile(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={50} label="M" />
                    <View>
                        <Text>Bienvenid@s a la Tienda de Mascotas</Text>
                        <Text>{userData?.displayName}</Text>    
                    </View>
                    <View style={styles.iconProfile}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(true)}/>
                    </View>
                </View>
                <View>
                    <FlatList 
                        data={mascotas}
                        renderItem={({item}) => <MascotaCardComponent mascot={item}/>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineSmall'>Perfil</Text>
                        <IconButton
                            icon="close-circle-outline"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(false)}
                            />
                    </View>
                    
                    <Divider/>
                    <TextInput
                        mode='outlined'
                        label="Nombre"
                        value={formUser.name}
                        onChangeText={(value) => handleSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label="Correo"
                        disabled
                        value={userData?.email!}
                    />
                    <Button mode='contained' onPress={handleUpdateUser}>Actualizar</Button>
                    <View style={styles.iconSignOut}>
                        <IconButton
                            icon="logout-variant"
                            size={35}
                            onPress={handleSignOut}
                        />
                    </View>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.fabProduct}
                onPress={() => setShowModalMascota(true)}
            />
            <NewMascotaComponent showModalMascota={showModalMascota} setShowModalMascota={setShowModalMascota}/>
        </>
    )
}

