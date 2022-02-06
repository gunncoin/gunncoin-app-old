/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import WalletScreen from "../screens/WalletScreen";
import GameScreen from "../screens/GameScreen";
import SettingScreen from "../screens/SettingScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabel: "",
        tabBarStyle: {
          backgroundColor: "none",
          height: 150,
          paddingHorizontal: "15%",
        },
      }}
    >
      <BottomTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }: RootTabScreenProps<"Wallet">) => ({
          title: "Wallet",
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Games"
        component={GameScreen}
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => <TabBarIcon name="skin" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="setting" color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={30} style={{}} {...props} />;
}
