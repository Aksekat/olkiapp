import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import { AuthProvider } from './src/components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;