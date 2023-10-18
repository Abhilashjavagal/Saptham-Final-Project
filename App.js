import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from './src/screens/DrawerContainer/DrawerContainer';

function App() {
  return (
    <NavigationContainer>
      <DrawerContainer />
    </NavigationContainer>
  );
}

export default App;
