import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../NumberContainer';
import Card from '../Card';
import MainButton from '../MainButton';
import BodyText from '../BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    } 

    return rndNum;
};

const renderListItem = (value, rounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{rounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
); 

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } = props;

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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

        // inkrementacja, żeby łatwiej było zrobić klucz na jakiejść liście - jakie to słabe...
        currentLow.current = currentGuess + 1;
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
        //setRounds(curRounds => curRounds + 1);        
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={onGuessLower}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={onGuessGreater}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
    },
    list: {
        flex: 1,
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default GameScreen;
