import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import MessageContainer from '@/components/MessageContainer';
import LoadingComponent from '@/components/LoadingComponent';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const colors = Colors[useColorScheme() ?? 'light'];
  const router = useRouter();

  const { authState, onRegister } = useAuth();
  useEffect(() => {
    if (authState?.authenticated) {
      router.push('/(tabs)/home');
    }
  }, [authState?.authenticated, router]);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [messageObj, setMessageObj] = useState<{
    message?: string;
    type?: 'error' | 'success';
  }>({});

  const handleRegister = async () => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Address:', address);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Validate form fields
    if (!firstName || !lastName || !email || !phone || !address || !password || !confirmPassword) {
      setMessageObj({
        message: 'Please fill in all the fields.',
      });
    } else if (password !== confirmPassword) {
      setMessageObj({
        message: 'Passwords do not match.',
      });
    } else {
      setMessageObj({
        message: ''
      });
      setLoading(true);
      // Perform registration
      const result = await onRegister!(email, password, firstName, lastName, phone)
      if (result?.error) {
        setMessageObj({
          message: result.msg,
          type: 'error',
        });
        setLoading(false);
      } else {
        setMessageObj({
          message: 'Registration successful.',
          type: 'success',
        });
        setLoading(false);

        // Redirect to login page
        router.push('/login');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>Register</Text>
          <Text style={[styles.infoText, { color: colors.text }]}>
            Enter your details to create an account.
          </Text>

          {/* First Name Field */}
          <TextInput
            style={[styles.input, {
              color: colors.text,
              borderBottomWidth: focusedInput === 'firstName' ? 2 : 1,
              borderBottomColor: focusedInput === 'firstName' ? colors.tint : colors.border
            }]}
            onFocus={() => setFocusedInput('firstName')}
            onBlur={() => setFocusedInput(null)}
            placeholder="First Name"
            placeholderTextColor={colors.placeholder}
            value={firstName}
            onChangeText={setFirstName}
          />

          {/* Last Name Field */}
          <TextInput
            style={[styles.input, {
              color: colors.text,
              borderBottomWidth: focusedInput === 'lastName' ? 2 : 1,
              borderBottomColor: focusedInput === 'lastName' ? colors.tint : colors.border
            }]}
            onFocus={() => setFocusedInput('lastName')}
            onBlur={() => setFocusedInput(null)}
            placeholder="Last Name"
            placeholderTextColor={colors.placeholder}
            value={lastName}
            onChangeText={setLastName}
          />

          {/* Email Field */}
          <TextInput
            style={[styles.input, {
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

          {/* Phone Field */}
          <TextInput
            style={[styles.input, {
              color: colors.text,
              borderBottomWidth: focusedInput === 'phone' ? 2 : 1,
              borderBottomColor: focusedInput === 'phone' ? colors.tint : colors.border
            }]}
            onFocus={() => setFocusedInput('phone')}
            onBlur={() => setFocusedInput(null)}
            placeholder="Phone Number"
            placeholderTextColor={colors.placeholder}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Address Field */}
          <TextInput
            style={[
              styles.input,
              {
                paddingVertical: 15,
                color: colors.text,
                borderBottomWidth: focusedInput === 'address' ? 2 : 1,
                borderBottomColor: focusedInput === 'address' ? colors.tint : colors.border
              },
            ]}
            onFocus={() => setFocusedInput('address')}
            onBlur={() => setFocusedInput(null)}
            placeholder="Address"
            placeholderTextColor={colors.placeholder}
            value={address}
            onChangeText={setAddress}
            multiline
          />

          {/* Password Field */}
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

          {/* Confirm Password Field */}
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

          {/* Display error message */}
          <MessageContainer message={messageObj.message} type={messageObj.type} />

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleRegister}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LoadingComponent loading={loading} />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Platform.OS === 'web' ? '45%' : '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Fonts.primary.title,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    width: '100%',
    textAlign: 'center',
  },
  infoText: {
    fontFamily: Fonts.primary.body,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  required: {
    color: 'red',
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
});
