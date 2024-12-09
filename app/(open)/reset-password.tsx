import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const ResetPassword = () => {
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = () => {
        console.log('Password:', password);
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
                <Text style={[styles.infoText, { color: colors.text }]}>
                    Enter your new password to reset your account
                </Text>

                <TextInput
                    style={[styles.input, {
                        color: colors.text,
                        borderBottomWidth: focusedInput === 'password' ? 2 : 1,
                        borderBottomColor: focusedInput === 'password' ? colors.tint : colors.border
                    }]}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Password"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={[styles.input, {
                        color: colors.text,
                        borderBottomWidth: focusedInput === 'confPassword' ? 2 : 1,
                        borderBottomColor: focusedInput === 'confPassword' ? colors.tint : colors.border
                    }]}
                    onFocus={() => setFocusedInput('confPassword')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.tint }]}
                    onPress={handleResetPassword}
                >
                    <Text style={[styles.buttonText, { color: colors.background }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: colors.error }]}
                    onPress={() => router.navigate('/login')}
                >
                    <Text style={[styles.buttonText, { color: colors.background }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: Platform.OS === 'web' ? '45%' : '100%',
    },
    title: {
        fontFamily: Fonts.primary.title,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    infoText: {
        fontFamily: Fonts.primary.body,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        fontFamily: Fonts.primary.body,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        fontFamily: Fonts.primary.body,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    link: {
        marginTop: 15,
    },
    linkText: {
        fontFamily: Fonts.primary.body,
        fontSize: 14,
    },
})