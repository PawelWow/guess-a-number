import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import Colors from '../../constans/colors';

import BodyText from '../BodyText';
import TitleText from '../TitleText';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/success.png')}
                // dla obrazka z sieci source={{uri: 'https://uri-do-obrazka}} i koniecznie trzeba zdefiniować width i height (dla lokalnego nie trzeba)
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to 
                    guess the number{' '}
                    <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    );
};

// aby mieć idealne koło na andoridzie, imageContainer musi być kwadratem, a borderRadius musi mieć połowę wartości width i height

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 50,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;