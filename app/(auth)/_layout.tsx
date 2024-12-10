import { Tabs } from 'expo-router';
import React from 'react'
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../context/AuthContext';

const AuthLayout = () => {
    const colorScheme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: true,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Login',
                    tabBarIcon: ({ color }) => <Ionicons name="lock-closed" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Register',
                    tabBarIcon: ({ color }) => <Ionicons name="create" size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}

export default AuthLayout