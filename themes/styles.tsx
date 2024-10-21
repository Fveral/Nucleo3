import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 10
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    message: {
        width: 300
    },
    textRedirect: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#705aa9'
    },
    rootActivity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rootHome: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 50
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    iconProfile: {
        alignItems: "flex-end",
        flex: 1
    },
    modal: {
        padding:20,
        marginHorizontal:20,
        backgroundColor: '#fff',
        borderRadius:10,
        gap:10
    },
    rootListMascota: {
        marginTop: 10,
        flexDirection:'row',
        padding: 10,
        alignItems:'center',
        gap: 20
    },
    fabProduct: {
        position: 'absolute',
        bottom:20
    },
    rootDetail: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f7f7f7',
        paddingVertical: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '48%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        fontWeight: '400',
        color: '#007ACC',
    },
    button: {
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    iconSignOut: {
        marginTop: 25,
        alignItems: 'center'
    }

})