import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import DefaultStyles from '../../constans/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is over!</Text>
            <Text style={DefaultStyles.bodyText}>Number of rounds: {props.roundsNumber}</Text>
            <Text style={DefaultStyles.bodyText}>The number was: {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;