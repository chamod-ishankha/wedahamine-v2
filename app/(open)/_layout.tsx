import React from 'react'
import { Stack } from 'expo-router'

const OpenLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="forgot-password"
                options={{
                    title: 'Forgot Password',
                }}
            />
            <Stack.Screen name="reset-password"
                options={{
                    title: 'Reset Password',
                }}
            />
        </Stack>
    )
}

export default OpenLayout