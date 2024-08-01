import React from 'react'
import { Text, View } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View>
      <Text onPress={()=>{navigation.navigate('Login')}}>Login</Text>
    </View>
  )
}

export default Home