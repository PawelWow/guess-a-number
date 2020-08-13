import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../Card';
import Input from '../Input';
import Colors from '../../constans/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');

    const onNumberChanged = inputValue => {
        setEnteredValue(inputValue.replace(/[^0-9]/g, ''));
    };

    const onConfirmNumber = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'It has to be a number between 1 and 99', 
                [{text: 'OK', style: 'destructive', onPress: onResetNumber}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        
    }

    const onResetNumber = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    let confirmedOutput;
    if(confirmed){
        confirmedOutput = <Text>Chosen number: {selectedNumber}</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} 
                        blurOnSubmit 
                        keyboardType="number-pad" 
                        autoCorrect={false} 
                        AutoCapitalize='none' 
                        maxLength={2}
                        onChangeText={onNumberChanged} 
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button style={styles.button} title="Reset" onPress={onResetNumber} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button} title="Confirm" onPress={onConfirmNumber} color={Colors.primary} />                        
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

// shadow działa tylko na iOS, dla androida jest elevation
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    }

});

export default StartGameScreen;