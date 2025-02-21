import UserDetails from '../components/UserDetails';
import { ScrollView } from 'react-native';

const UserScreen = ({ route }) => {
  const user = route.params.user;
  return (
    <>
      <ScrollView>
        <UserDetails user={user} />
      </ScrollView>
    </>
  );
};

export default UserScreen;