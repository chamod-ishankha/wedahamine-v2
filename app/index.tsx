import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Button, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Welcome to Wedahamine',
        description: 'Explore Ayurvedic treatments and products tailored for your well-being.',
        image: require('@/assets/app-images/onboarding1.jpg'),
    },
    {
        id: '2',
        title: 'Book Appointments',
        description: 'Schedule consultations with expert Ayurvedic doctors.',
        image: require('@/assets/app-images/onboarding2.jpg'),
    },
    {
        id: '3',
        title: 'Shop Ayurvedic Products',
        description: 'Order authentic Ayurvedic items with ease.',
        image: require('@/assets/app-images/onboarding3.png'),
    },
];

const Onboarding = () => {
    const router = useRouter();
    const { authState } = useAuth();

    useEffect(() => {
        if (authState?.authenticated) {
            router.push('/(tabs)/home');
        }
    }, [authState?.authenticated, router]);

    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: any) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(slideIndex);
    };

    const handleGetStarted = () => {
        router.push('/(auth)/login');
    };

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToOffset({
                offset: (currentIndex + 1) * width,
                animated: true,
            });
            setCurrentIndex((prev) => prev + 1);
        }
    };


    const renderItem = ({ item }: any) => (
        <View style={[styles.slide, { backgroundColor: colors.background }]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={Platform.OS !== 'web' ? { marginTop: -100 } : {}}
            />
            <View style={styles.footer}>
                {/* Dots Indicator */}
                <View style={styles.indicatorContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: currentIndex === index ? colors.tint : colors.tabIconDefault },
                            ]}
                        />
                    ))}
                </View>
                {/* Get Started Button */}
                {currentIndex === slides.length - 1 ? (
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.tint }]} onPress={handleGetStarted}>
                        <Text style={[styles.buttonText, { color: colors.background }]}>Get Started</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.tabIconDefault }]} onPress={nextSlide}>
                        <Text style={[styles.buttonText, { color: colors.background }]}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS !== 'web' ? 20 : 0,
    },
    image: {
        width: '100%',
        height: height * 0.8,
        resizeMode: 'cover',
        opacity: 0.5,
        alignSelf: 'center',
    },
    title: {
        fontFamily: Fonts.primary.title,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontFamily: Fonts.primary.body,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        fontFamily: Fonts.primary.body,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textContainer: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }],

    }
});
