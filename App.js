import React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import GameOverScreen from './components/screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

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
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {showGameScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
