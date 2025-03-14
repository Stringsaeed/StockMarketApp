import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import NasdaqIcon from '@/components/icons/nasdaq-icon';
import {RootStackScreenProps, RootStackScreens} from '@/types/navigation';

type ScreenProps = RootStackScreenProps<RootStackScreens.Splash>;

const SplashScreen = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(RootStackScreens.Explore);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View testID="splash-screen" style={styles.container}>
      <StatusBar hidden />
      <NasdaqIcon width={250} testID="nasdaq-icon" />
      <Text style={styles.title}>Stocks</Text>
      <Text style={styles.developer}>
        Developed by Muhammed Saeed{'\n'}
        <Text style={styles.developerLink}>stringsaeed@gmail.com</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  title: {
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    fontSize: 24,
  },
  developer: {
    position: 'absolute',
    textAlign: 'center',
    color: '#ccc',
    fontSize: 16,
    bottom: 40,
  },
  developerLink: {
    textDecorationLine: 'underline',
    color: '#ccc',
    opacity: 0.87,
  },
  logo: {
    marginBottom: 30,
    height: 100,
    width: 250,
  },
});

export default SplashScreen;
