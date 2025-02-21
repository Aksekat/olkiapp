import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export class AuthManager {
  static signIn = async (tokenRes, sharepointToken) => {
    // Due to size limitations of SecureStore, access token needs to be split
    const accessTokenString0 = tokenRes.accessToken.slice(0, 2048);
    const accessTokenString1 = tokenRes.accessToken.slice(2048, tokenRes.accessToken.length);
    save('accessToken0', accessTokenString0);
    save('accessToken1', accessTokenString1);
    save('sharepointToken', sharepointToken);
    save('refreshToken', tokenRes.refreshToken);
    save('tokenIssuedAt', JSON.stringify(tokenRes.issuedAt));
    save('tokenExpiresIn', JSON.stringify(tokenRes.expiresIn));
    console.log('login successful in SignInButton component');
  };

  static signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken0');
    await SecureStore.deleteItemAsync('accessToken1');
    await SecureStore.deleteItemAsync('sharepointToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('tokenIssuedAt');
    await SecureStore.deleteItemAsync('tokenExpiresIn');
    SecureStore.getItemAsync('accessToken0').then((res) => console.log('\nAccess token in SecureStore after logging out: ' + res));
    SecureStore.getItemAsync('refreshToken').then((res) => console.log('\nRefresh token in SecureStore after logging out: ' + res));
  };
}
