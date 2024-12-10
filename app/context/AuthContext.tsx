import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from "expo-secure-store"
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onRegister: (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
    ) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;

    onForgotPassword?: (email: string) => Promise<any>;
    onVerifyOtp?: (email: string, otp: string) => Promise<any>;
    onResetPassword?: (email: string, otp: string, password: string) => Promise<any>;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
export const API_URL = 'http://192.168.1.8:30088/api/wedahamine/v1';
// export const API_URL = 'http://localhost:8080/api/wedahamine/v1';
const AuthContext = createContext<AuthProps>({
    authState: { token: null, authenticated: null },
    onRegister: async () => { },
    onLogin: async () => { },
    onLogout: async () => { },
    onForgotPassword: async () => { },
    onVerifyOtp: async () => { },
    onResetPassword: async () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (props: React.PropsWithChildren) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        user: any | null,
        authenticated: boolean | null
    }>({
        token: null,
        user: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            let token: string | null = null;
            let user: string | null = null;

            if (Platform.OS === 'web') {
                token = await AsyncStorage.getItem(TOKEN_KEY);
                user = await AsyncStorage.getItem(USER_KEY);
            } else {
                token = await SecureStore.getItemAsync(TOKEN_KEY);
                user = await SecureStore.getItemAsync(USER_KEY);
            }

            if (token && user) {
                setAuthState({
                    token,
                    user: JSON.parse(user),
                    authenticated: true
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                setAuthState({
                    token: null,
                    user: null,
                    authenticated: false
                });
            }
        };

        loadToken();
    }, []);

    const register = async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
        try {
            return await axios.post(`${API_URL}/auth/register`, {
                email,
                password,
                firstName,
                lastName,
                phone
            });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            setAuthState({ token: response.data.tokenDto.token, user: response.data, authenticated: true });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokenDto.token}`;

            if (Platform.OS === 'web') {
                await AsyncStorage.setItem(TOKEN_KEY, response.data.tokenDto.token);
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
            } else {
                await SecureStore.setItemAsync(TOKEN_KEY, response.data.tokenDto.token);
                await SecureStore.setItemAsync(USER_KEY, JSON.stringify(response.data));
            }

            return response;
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    };

    const logout = async () => {
        // Remove the token from the storage
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_KEY);
        }

        // Remove the token from the axios default headers
        axios.defaults.headers.common['Authorization'] = '';

        // Reset the auth state
        setAuthState({ token: null, user: null, authenticated: false });
    };

    const forgotPassword = async (email: string) => {
        try {
            return await axios.post(`${API_URL}/auth/forgot-password?email=${email}`);
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    }

    const verifyOtp = async (email: string, otp: string) => {
        try {
            return await axios.post(`${API_URL}/auth/verify-otp`, {
                email,
                otp
            });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    }

    const resetPassword = async (email: string, otp: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/auth/reset-password`, {
                email,
                otp,
                newPassword: password
            });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.message }
        }
    }

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onForgotPassword: forgotPassword,
        onVerifyOtp: verifyOtp,
        onResetPassword: resetPassword,
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

// Default export
export default AuthProvider;