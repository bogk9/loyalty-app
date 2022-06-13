import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState, useCallback } from "react";
import { HomeScreen } from "./src/views/HomeScreen";
import { LoginScreen } from "./src/views/LoginScreen";
import { SettingsScreen } from "./src/views/SettingsScreen";
import { OrdersScreen } from "./src/views/OrdersScreen";
import { checkToken } from "./src/redux/actions/userActions";
import { Provider, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NativeBaseProvider } from "native-base";
import store from "./src/redux/store";

function App() {
  const access_token = useSelector((store) => store.user.access_token);
  const splash = useSelector((store) => store.user.splash);
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        dispatch(checkToken());
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    async function hideSplash() {
      !splash && (await SplashScreen.hideAsync());
    }
    hideSplash();
  }, [splash]);

  if (access_token) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            gestureEnabled: true,
            swipeEnabled: true,
            swipeEdgeWidth: 100,
            swipeMinDistance: 100,
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Menu główne", gestureEnabled: true }}
          />
          <Drawer.Screen
            name="Historia"
            component={OrdersScreen}
            options={{ title: "Historia" }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings", gestureEnabled: true }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <App />
        </NativeBaseProvider>
    </Provider>
  );
}