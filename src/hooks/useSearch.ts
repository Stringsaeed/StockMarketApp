import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback, useLayoutEffect, useState} from 'react';

import {useDebounce} from './useDebounce';

export const useSearch = <
  NavigationType extends NativeStackNavigationProp<any>,
>({
  placeholder,
  navigation,
}: {
  navigation: NavigationType;
  placeholder: string;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const deferredSearchQuery = useDebounce(searchQuery, 300);

  const handleClearSearch = useCallback(() => setSearchQuery(''), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setSearchQuery(e.nativeEvent.text),
        onCancelButtonPress: () => handleClearSearch(),
        hideWhenScrolling: true,
        hideNavigationBar: true,
        placeholder,
      },
    });
  }, [handleClearSearch, navigation, placeholder, setSearchQuery]);

  return {deferredSearchQuery};
};
