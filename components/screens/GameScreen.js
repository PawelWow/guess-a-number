import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
); 

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const showCheatingAlert = () => {
        Alert.alert("Stop cheating!", "Everybody knows this is a lie...", [{ text: 'Sorry!', style: 'cancel'}]);
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
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }

    let listContainerStyle = styles.listContainer;
    if (availableDeviceWidth < 350 ) {
        listContainerStyle = styles.listContainerBig;
    }

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 20 : 5}}}>
                <MainButton onPress={onGuessLower}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={onGuessGreater}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
        </React.Fragment>
    );

    if( availableDeviceHeight < 500 ){
        gameControls = (
            <View style={styles.controls}>
                <MainButton onPress={onGuessLower}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={onGuessGreater}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </View>
        );      
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            {gameControls}
            <View style={styles.listContainer}>
                {/*
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
                */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.lists}
                />
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
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',        
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
