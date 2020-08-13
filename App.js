import React, { useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const onStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  // wybiera ekran gry
  const showGameScreen = () => {
    if(userNumber) {
      return <GameScreen userChoice={userNumber} />;
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
