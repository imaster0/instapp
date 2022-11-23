import React from 'react'
import { useAuth } from '../AuthContextProvider'
import { Button, StyleSheet, View } from 'react-native'
import Header from '../components/Header/Header'
import theme from '../Theme'

const WelcomeScreen = () => {
  const { startJourney } = useAuth()
  return (
    <View style={styles.container}>
      <Header style={{ marginBottom: theme.spacings.base }}>Welcome</Header>
      <Button title="Start journey" onPress={startJourney} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default WelcomeScreen
