import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const AvatarComponent = ({ isListening, isSpeaking }) => {
    const [blinkAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        if (!isSpeaking && !isListening) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(blinkAnimation, {
                        toValue: 1,
                        duration: 100,
                        useNativeDriver: false,
                    }),
                    Animated.timing(blinkAnimation, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        }
    }, [isSpeaking, isListening]);

    const blinkOpacity = blinkAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.3],
    });

    return (
        <View style={styles.container}>
            <View style={styles.avatarWrapper }>
                <Animated.Image source={require('../assets/avatar.png')} style={[styles.avatar, { opacity: blinkOpacity }]} />
                {isListening && (
                    <LottieView source={require('../assets/listening.json')} autoPlay loop style={styles.animation} />
                )}
                {isSpeaking && (
                    <LottieView source={require('../assets/speaking.json')} autoPlay loop style={styles.animation} />
                )}
            </View>
            <View style={styles.statusContainer}>
                {isListening && <Text style={styles.status}>Listening...</Text>}
                {isSpeaking && <Text style={styles.status}>Speaking...</Text>}
                {!isListening && !isSpeaking && <Text style={styles.status}>Ready</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    avatarWrapper: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    animation: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    statusContainer: {
        marginTop: 20,
    },
    status: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default AvatarComponent;