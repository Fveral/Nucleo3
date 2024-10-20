import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { styles } from '../themes/styles';
import DetailMascot from '../screens/HomeScreen/DetailMascot';

interface Routes {
    name: string;
    screen: () => JSX.Element; 
    headerShow?: boolean;
}

const routesNoAuth: Routes[] = [
    {name: 'Login', screen: LoginScreen},
    {name: 'Register', screen: RegisterScreen}
];

const routesAuth: Routes[] = [
    {name: 'Home', screen: HomeScreen},
    {name: 'Detail', screen: DetailMascot, headerShow: true}
];

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const[isAuth, setIsAuth] = useState<boolean>(false);
    const[isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user)=>{
            if(user) {
                setIsAuth(true);
            }else {
                setIsAuth(false);
            }
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            { isLoading ? (
                <View style={styles.rootActivity}>
                    <ActivityIndicator animating={true} size={30} />
                </View>): (
                <Stack.Navigator>
                    {
                        !isAuth ?
                        routesNoAuth.map((item, index) => (
                            <Stack.Screen key={index}
                                name={item.name} 
                                options={{ headerShown: false}} 
                                component={item.screen} />
                        ))
                        : routesAuth.map((item, index) => (
                            <Stack.Screen key={index}
                            name={item.name} 
                            options={{ headerShown: item.headerShow  ?? false}} 
                            component={item.screen} />  
                        ))
                    }
                {/*<Stack.Screen name="Register" options={{ headerShown: false}} component={RegisterScreen} /> */}
                </Stack.Navigator>)}
        </>
    );
}