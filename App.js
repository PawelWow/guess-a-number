import React, { useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import * as Font from 'expo-font';
import {AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import GameOverScreen from './components/screens/GameOverScreen';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if( !dataLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error) } />
    );
  };

  const onConfigureNewGame = () => {
      setGuessRounds(0);
      setUserNumber(null);
  }

  const onStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const onGameOver = roundsNumber => {
    setGuessRounds(roundsNumber);
  };

  // wybiera ekran gry
  const showGameScreen = () => {
    if(userNumber && guessRounds <= 0 ) {
      return <GameScreen userChoice={userNumber} onGameOver={onGameOver} />;
    }
  
    if(guessRounds > 0)
    {
      return <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={onConfigureNewGame} />
    }

    return <StartGameScreen onStartGame={onStartGame} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a number" />
        {showGameScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
