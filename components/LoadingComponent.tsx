import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'

// props
export type LoadingComponentProps = {
    loading: boolean | undefined;
}

const LoadingComponent = ({ loading }: LoadingComponentProps) => {
    const colors = Colors[useColorScheme() ?? 'light'];
    return (
        loading && (
            <View style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <ActivityIndicator size="large" color={colors.tint} />
            </View>
        )
    )
}

export default LoadingComponent

const styles = StyleSheet.create({})