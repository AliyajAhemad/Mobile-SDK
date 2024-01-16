// ScreenA.js
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSharedContext } from './SharedContext';

const ScreenA = () => {
  const navigation = useNavigation();
  const { updateSharedState } = useSharedContext();

  const onPress = () => {
    updateSharedState('Hello from Screen A');
    navigation.navigate('ScreenB');
  };

  return <Button title="Go to Screen B" onPress={onPress} />;
};

export default ScreenA;