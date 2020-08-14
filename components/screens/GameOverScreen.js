import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import DefaultStyles from '../../constans/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/success.png')}
                // dla obrazka z sieci source={{uri: 'https://uri-do-obrazka}} i koniecznie trzeba zdefiniować width i height (dla lokalnego nie trzeba)
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text style={DefaultStyles.bodyText}>Number of rounds: {props.roundsNumber}</Text>
            <Text style={DefaultStyles.bodyText}>The number was: {props.userNumber}</Text>
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
    }
});

export default GameOverScreen;