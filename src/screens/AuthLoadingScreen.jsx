import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../components/AuthContext';
import Text from '../components/Text';

const AuthLoadingScreen = () => {
  const { authUtils } = useContext(AuthContext);

  // Fetch tokens stored on local device.
  useEffect(() => {
    const bootstrapAsync = async () => {
      let accessToken = '';
      try {
        const token0 = await SecureStore.getItemAsync('accessToken0');
        const token1 = await SecureStore.getItemAsync('accessToken1');
        const sharepointToken = await SecureStore.getItemAsync('sharepointToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const tokenIssuedAt = await SecureStore.getItemAsync('tokenIssuedAt');
        const tokenExpiresIn = await SecureStore.getItemAsync('tokenExpiresIn');
        if (token0 && token1 && sharepointToken && refreshToken && tokenIssuedAt && tokenExpiresIn) {
          accessToken = token0.concat(token1);
          console.log('\nAccess token in local storage: ', accessToken);
          console.log('\nSharepoint token in local storage: ', sharepointToken);
          console.log('\nRefresh token in local storage: ', refreshToken);
          console.log('\nToken issued at: ', tokenIssuedAt);
          console.log('\nToken expires in: ', tokenExpiresIn);
          authUtils.restoreToken(accessToken, sharepointToken, refreshToken, tokenIssuedAt, tokenExpiresIn);
        } else {
          authUtils.stopProcessing();
        }
      } catch (e) {
        console.log(e);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        color='#276b80'
        size='large'
      />
      <Text style={styles.statusText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 10,
  },
});

export default AuthLoadingScreen;