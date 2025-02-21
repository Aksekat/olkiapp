import { useContext, useEffect } from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import { AuthContext } from './AuthContext';
import { CLIENT_SECRET, CLIENT_ID, RESOURCES } from '@env';

const AppConfig = {
  appId: '40972510-839b-47f1-aaf9-32541ec031ee',
  appScopes: [
    'openid',
    'offline_access',
    'profile',
    'User.Read',
    'MailboxSettings.Read',
    'Calendars.ReadWrite',
    'Sites.ReadWrite.All',
    'Sites.Read.All'
  ],
};

const SignInButton = () => {
  const { authUtils } = useContext(AuthContext);

  // Auth endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/18rnz8.onmicrosoft.com/v2.0');
  const redirectUri = makeRedirectUri({ scheme: 'myapp' });

  WebBrowser.maybeCompleteAuthSession();

  // Utility function for saving items
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  // Creating initial authorization code request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AppConfig.appId,
      scopes: AppConfig.appScopes,
      redirectUri: redirectUri
    },
    discovery
  );

  useEffect(() => {

    let sharepointToken;
    //Access token for sharepoint api
    fetch('https://accounts.accesscontrol.windows.net/cf265028-1621-40ba-b66e-d64a82beec4c/tokens/OAuth/2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&resource=${RESOURCES}`
    })
      .then(res => res.json())
      .then(token => {
        sharepointToken = token.access_token;
        save('sharepointToken', token.access_token);

      })
      .catch(err => console.error(err));

    // Request for token if authorization code received
    if (response) {
      if (response.error) {
        console.log(
          'Authentication error',
          response.params.error_description || 'something went wrong'
        );
        authUtils.stopProcessing();
        return;
      }
      if (response.type === 'success') {
        if (response.params.code) {
          exchangeCodeAsync(
            {
              clientId: AppConfig.appId,
              scopes: AppConfig.appScopes,
              code: response.params.code,
              redirectUri: redirectUri,
              extraParams: {
                code_verifier: request.codeVerifier,
                grant_type: 'authorization_code',
              }
            },
            discovery
          ).then(tokenRes => {
            // If token if received, sign in with both Graph and SharePoint access tokens
            if (tokenRes) {
              authUtils.signIn(tokenRes, sharepointToken);
            }
          });
        }
      }
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Kirjaudu sisään"
      onPress={() => {
        authUtils.process();
        promptAsync();
      }} />
  );
};

export default SignInButton;
