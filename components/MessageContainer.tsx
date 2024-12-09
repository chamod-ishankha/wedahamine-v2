import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export type MessageContainerProps = ViewProps & {
    message?: string;
    type: 'error' | 'success' | undefined;
};

const MessageContainer = ({ message, type, ...otherProps }: MessageContainerProps) => {
    type = type ?? 'error';
    const colors = Colors[useColorScheme() ?? 'light'];
    return (
        message && (
            <View style={[styles.messageContainer, { backgroundColor: type === 'error' ? colors.messageContainerError : colors.messageContainerSuccess }]} {...otherProps}>
                <Text style={[styles.messageText, { color: colors.text }]}>
                    {message}
                </Text>
            </View>
        )
    )
}

export default MessageContainer

const styles = StyleSheet.create({
    messageContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    messageText: {
        fontFamily: Fonts.primary.body,
        fontSize: 14,
        textAlign: 'center',
    }
})