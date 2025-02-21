import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../components/AuthContext';

import SignInScreen from '../screens/SignInScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import NewsScreen from '../screens/NewsScreen';
import EventScreen from '../screens/EventScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import NotificationFeedScreen from '../screens/NotificationFeedScreen';
import LunchMenuScreen from '../screens/LunchMenuScreen';
import TrainingProgramFeedScreen from '../screens/TrainingProgramFeedScreen';
import GoalsScreen from '../screens/GoalsScreen';
import MaintenanceFeedScreen from '../screens/MaintenanceFeedScreen';
import UserListScreen from '../screens/UserListScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  const { authState } = useContext(AuthContext);

  if (authState.isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {authState.accessToken === null ? (
        <Stack.Screen name="Login" component={SignInScreen} options={{ headerShown: false, animationTypeForReplace: authState.isSignOut ? 'pop' : 'push', }} />
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Uutinen" component={NewsScreen} options={{ headerShown: true, title:'' }} />
          <Stack.Screen name="EventDetails" component={EventScreen} options={{ headerShown: true, title:'' }} />
          <Stack.Screen name="UserDetails" component={UserScreen} options={{ headerShown: true, title:'' }} />
        </>)}
    </Stack.Navigator>
  );
};

const Home = () => {
  const { authUtils } = useContext(AuthContext);
  return (
    <Drawer.Navigator initialRouteName="News" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Kirjaudu ulos" onPress={() => {
            Alert.alert('Kirjaudu ulos', 'Haluatko varmasti kirjautua ulos?', [
              { text: 'Kyllä', onPress: () => authUtils.signOut() },
              {
                text: 'Peruuta',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
            ]
            );
          }}
          />
        </DrawerContentScrollView>
      );
    }}>
      <Drawer.Screen name="Uutiset" component={NewsFeedScreen} />
      <Drawer.Screen name="Ilmoitukset" component={NotificationFeedScreen} />
      <Drawer.Screen name="Ruokalista" component={LunchMenuScreen} />
      <Drawer.Screen name="Koulutukset" component={TrainingProgramFeedScreen} />
      <Drawer.Screen name="Vuosihuollot" component={MaintenanceFeedScreen} />
      <Drawer.Screen name="Tavoitteet" component={GoalsScreen} />
      <Drawer.Screen name="Puhelinluettelo" component={UserListScreen} />
    </Drawer.Navigator>
  );
};

export default Routes;
