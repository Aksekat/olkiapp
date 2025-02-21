import { View, ActivityIndicator, Platform } from 'react-native';
import { useContext } from 'react';
import SignInButton from '../components/SignInButton';
import { AuthContext } from '../components/AuthContext';

const SignInScreen = () => {

  const { authState } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator
        color='#276b80'
        size='large'
        animating={authState.isProcessing} />
      <View style={{ marginTop: 10 }}>
        <SignInButton />
      </View>

    </View>
  );
};

export default SignInScreen;