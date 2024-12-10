import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageContainer from '@/components/MessageContainer';
import LoadingComponent from '@/components/LoadingComponent';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const router = useRouter();

  const { authState, onLogin } = useAuth();
  useEffect(() => {
    if (authState?.authenticated) {
      router.push('/(tabs)/home');
    }
  }, [authState?.authenticated, router]);

  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colors = Colors[useColorScheme() ?? 'light'];
  const [messageObj, setMessageObj] = useState<{
    message?: string;
    type?: 'error' | 'success';
  }>({});

  const handleLogin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);

    // Validate form fields
    if (!email || !password) {
      setMessageObj({
        message: 'Please enter your email and password.'
      });
    } else {
      setMessageObj({
        message: ''
      });

      setLoading(true);
      // Perform login
      const result = await onLogin!(email, password);
      if (result?.error) {
        setMessageObj({
          message: result.msg,
          type: 'error'
        });
        setLoading(false);
      } else {
        setMessageObj({
          message: 'Login successful',
          type: 'success'
        });
        setLoading(false);
        router.push('/home');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Login</Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Enter your email and password to login.
        </Text>
        <TextInput
          style={[styles.input,
          {
            color: colors.text,
            borderBottomWidth: focusedInput === 'email' ? 2 : 1,
            borderBottomColor: focusedInput === 'email' ? colors.tint : colors.border
          }]}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          placeholder="Email"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}

        />
        <TextInput
          style={[styles.input,
          {
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

        {/* Display error message */}
        <MessageContainer message={messageObj.message} type={messageObj.type} />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}
          onPress={() => router.navigate('/forgot-password')}>
          <Text style={[styles.linkText, { color: colors.link }]}>I forgot my password</Text>
        </TouchableOpacity>
      </View>

      <LoadingComponent loading={loading} />
    </SafeAreaView>
  );
};

export default Login;

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
  link: {
    marginTop: 15,
  },
  linkText: {
    fontFamily: Fonts.primary.body,
    fontSize: 14,
  },
});
