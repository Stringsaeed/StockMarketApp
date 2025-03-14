import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {listItemStyles as styles} from './styles';
import {StockItemProps} from './types';

const getRandomBgColor = () => {
  // this function generates a random background color for the avatar with a contrast color for the text
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StockItemComponent = ({onPress, stock, index}: StockItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, index % 2 === 0 ? styles.evenContainer : {}]}
      onPress={onPress}
      activeOpacity={0.7}
      testID="stock-item">
      <View
        style={[styles.avatar, {backgroundColor: getRandomBgColor()}]}
        testID="stock-avatar">
        <Text
          accessible={false}
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.avatarText}>
          {stock.ticker}
        </Text>
      </View>
      <Text style={styles.ticker}>{stock.ticker}</Text>
      <Text style={styles.name}>{stock.name}</Text>
    </TouchableOpacity>
  );
};

export const StockItem = memo(StockItemComponent);
