import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';
import { Fonts } from '@/constants/Fonts';

export default function TabLayout() {
  const colors = Colors[useColorScheme() ?? 'light']
  const { authState, onLogout } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href='/login' />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
        headerRight: () => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.error }]}
            onPress={onLogout}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Logout</Text>
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 85,
    marginRight: 15,
  },
  buttonText: {
    fontFamily: Fonts.primary.body,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
