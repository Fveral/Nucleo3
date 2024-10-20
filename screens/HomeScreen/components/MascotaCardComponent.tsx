import { View } from "react-native"
import { IconButton, Text } from "react-native-paper"
import { styles } from "../../../themes/styles"
import { Mascota } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface Props {
    mascot: Mascota;
}

export const MascotaCardComponent = ({mascot}: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.rootListMascota}>
            <View>
                <Text>Nombre: {mascot.nombre}</Text>
                <Text>Contacto: {mascot.contactoDueno}</Text>
                <Text>Edad: {mascot.edad}</Text>
                <Text>Historial: {mascot.historialMedico}</Text>
            </View>
            <View style={styles.iconProfile}>
                <IconButton
                    icon="arrow-right-bold-outline"
                    size={25}
                    mode='contained'
                    onPress={() => navigation.dispatch(CommonActions.navigate({name: 'Detail', params: {mascot}}))}
                />
            </View>
        </View>
    )
}