import React from 'react';
import { View, Text } from 'react-native';
import { Chat } from './components/Chat';
import { Avatar } from './components/Avatar';
import { VoiceService } from './services/VoiceService';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the React Native Chat App</Text>
      <Avatar />
      <Chat />
      <VoiceService />
    </View>
  );
};

export default App;