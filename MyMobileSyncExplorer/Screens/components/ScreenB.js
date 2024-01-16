// ScreenB.js
import React from 'react';
import { Text } from 'react-native';
import { useSharedContext } from './SharedContext';

const ScreenB = () => {
  const { sharedState } = useSharedContext();

  return <Text>{sharedState}</Text>;
};

export default ScreenB;