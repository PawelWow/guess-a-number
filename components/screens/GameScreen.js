import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../NumberContainer';
import Card from '../Card';
import MainButton from '../MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    } 

    return rndNum;
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const showCheatingAlert = () => {
        Alert.alert("Stop cheating!", "Everybody knows this is lie...", [{ text: 'Sorry!', style: 'cancel'}]);
    }    

    // Zgaduje większy numer niż poprzednio
    const onGuessGreater = () => {
        if(currentGuess > props.userChoice) {
            showCheatingAlert();
            return;
        }

        currentLow.current = currentGuess;
        onGuess();
    }

    // Zgaduje mniejszy numer niż poprzednio
    const onGuessLower= () => {
        if(currentGuess < props.userChoice) {
            showCheatingAlert();
            return;
        }

        currentHigh.current = currentGuess;
        onGuess();
    }    

    // zagaduje kolejny numer
    const onGuess = () => {
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );

        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);        
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={onGuessLower}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={onGuessGreater}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
