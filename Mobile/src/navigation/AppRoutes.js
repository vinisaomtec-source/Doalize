import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';


// TELAS
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';

import PublishScreen from '../screens/Publish/PublishScreen';

import ContactsScreen from '../screens/Contacts/ContactsScreen';

import ChatScreen from '../screens/Chat/ChatScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';

import PublishedScreen from '../screens/Profile/PublishedScreen';

import SettingsScreen from '../screens/Settings/SettingsScreen';


// NAVIGATORS
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


// HOME STACK
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
}


// CONTACTS STACK
function ContactsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
      />

      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}


// PROFILE STACK
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="PublishedScreen"
        component={PublishedScreen}
      />

      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}


// APP ROUTES
export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 65,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 0,
          },

          tabBarActiveTintColor: '#2563eb',

          tabBarInactiveTintColor: '#777',
        }}
      >
        {/* HOME */}
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* PUBLICAR */}
        <Tab.Screen
          name="Publicar"
          component={PublishScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="add-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* CONTATOS */}
        <Tab.Screen
          name="Contatos"
          component={ContactsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="chatbubble"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* CONTA */}
        <Tab.Screen
          name="Conta"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}