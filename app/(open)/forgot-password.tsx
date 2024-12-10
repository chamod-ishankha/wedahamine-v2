import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';
import MessageContainer from '@/components/MessageContainer';
import { useAuth } from '../context/AuthContext';
import LoadingComponent from '@/components/LoadingComponent';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { authState, onForgotPassword, onVerifyOtp } = useAuth();
  useEffect(() => {
    if (authState?.authenticated) {
      router.push('/(tabs)/home');
    }
  }, [authState?.authenticated, router]);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill('')); // OTP input array
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [emailSent, setEmailSent] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(false); // Track if resend is enabled
  const [countdown, setCountdown] = useState(60); // Countdown timer for 1 minute
  const otpRefs = useRef<(TextInput | null)[]>([]); // References for the OTP inputs

  const [messageObj, setMessageObj] = useState<{
    message?: string;
    type?: 'error' | 'success';
  }>({});

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, isOtpSent]);

  // Mask the email to hide parts of it
  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 ? '*****' + username.slice(-2) : '*****';
    const maskedDomain = domain ? domain.replace(/^(.*)(?=\..*)/, '***') : '***';
    return `${maskedUsername}@${maskedDomain}`;
  };

  const handleSendOtp = async () => {
    if (email) {
      // isResendEnabled set MessageObj to resent OTP successfully & set messageObj again empty after 5 seconds
      if (isResendEnabled) {
        // Call the forgot password API
        setLoading(true);
        const result = await onForgotPassword!(email);
        if (result?.error) {
          setMessageObj({
            message: result.msg,
            type: 'error',
          });
          setLoading(false);
        } else {
          // Mask the entered email and display the masked version
          setEmailSent(maskEmail(email));
          setIsOtpSent(true);
          setIsResendEnabled(false);
          setCountdown(59); // Reset countdown

          setMessageObj({
            message: 'OTP resent successfully!',
            type: 'success',
          });
          setTimeout(() => {
            setMessageObj({
              message: '',
            });
          }, 5000);
          setLoading(false);
        }
      } else {
        setMessageObj({
          message: '',
        });

        // Call the forgot password API
        setLoading(true);
        const result = await onForgotPassword!(email);
        if (result?.error) {
          setMessageObj({
            message: result.msg,
            type: 'error',
          });
          setLoading(false);
        } else {
          // Mask the entered email and display the masked version
          setEmailSent(maskEmail(email));
          setIsOtpSent(true);
          setIsResendEnabled(false);
          setCountdown(59); // Reset countdown

          setMessageObj({
            message: result?.data?.message,
            type: 'success',
          });
          setTimeout(() => {
            setMessageObj({
              message: '',
            });
          }, 5000);
          setLoading(false);
        }
      }
    } else {
      setMessageObj({
        message: 'Please enter your email.',
        type: 'error',
      });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Prevent non-numeric values

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus(); // Move to the next input
    }
    if (value === '' && index > 0) {
      otpRefs.current[index - 1]?.focus(); // Move to the previous input on backspace
    }
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus(); // Focus previous input if backspace is pressed
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.join('').length === 6) {
      const otpValue = otp.join('');
      // Call the verify OTP API
      setLoading(true);
      const result = await onVerifyOtp!(email, otpValue);
      if (result?.error) {
        setMessageObj({
          message: result.msg,
          type: 'error',
        });
        setLoading(false);
      } else {
        setMessageObj({
          message: 'OTP verified successfully!',
          type: 'success',
        });
        setLoading(false);
        // Redirect to reset password page with email & otp
        router.push(`/reset-password?email=${email}&otp=${otpValue}`);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Forgot Password</Text>

        {!isOtpSent ? (
          <>
            <Text style={[styles.infoText, { color: colors.text }]}>Enter your email to receive a one-time password (OTP)</Text>
            <TextInput
              style={[styles.input,
              {
                color: colors.text,
                borderBottomWidth: focusedInput === 'email' ? 2 : 1,
                borderBottomColor: focusedInput === 'email' ? colors.tint : colors.border
              }]}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Registered Email"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {/* Display error message */}
            <MessageContainer message={messageObj.message} type={messageObj.type} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={handleSendOtp}
            >
              <Text style={[styles.buttonText, { color: colors.background }]}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.infoText, { color: colors.text }]}>OTP sent to your email {emailSent}</Text>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpRefs.current[index] = ref)} // Store ref
                  style={[styles.otpInput, {
                    color: colors.text,
                    borderBottomWidth: focusedInput === `otp-${index}` ? 2 : 1,
                    borderBottomColor: focusedInput === `otp-${index}` ? colors.tint : colors.border
                  }]}
                  onFocus={() => setFocusedInput(`otp-${index}`)}
                  onBlur={() => setFocusedInput(null)}
                  value={value}
                  onChangeText={(text) => handleOtpChange(index, text)}
                  onKeyPress={({ nativeEvent: { key } }) => handleOtpKeyPress(index, key)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
            {/* Display error message */}
            <MessageContainer message={messageObj.message} type={messageObj.type} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={handleOtpSubmit}
            >
              <Text style={[styles.buttonText, { color: colors.background }]}>Submit OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: colors.error }]}
              onPress={() => setIsOtpSent(false)}
            >
              <Text style={[styles.buttonText, { color: colors.background }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.resendButton,
                { backgroundColor: isResendEnabled ? colors.placeholder : colors.border },
              ]}
              onPress={handleSendOtp}
              disabled={!isResendEnabled}
            >
              <Text style={[styles.buttonText, { color: isResendEnabled ? colors.background : colors.placeholder }]}>Resend OTP {isResendEnabled ? '' : `in ${countdown}s`}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <LoadingComponent loading={loading} />
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
  cancelButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  resendButton: {
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
  infoText: {
    fontFamily: Fonts.primary.body,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
});