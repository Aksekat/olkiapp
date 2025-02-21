import { View, Image } from 'react-native';
import Text from './Text';


const UserDetails = ({ user }) => {
  return (
    <View style={{ alignItems: 'center', flex: 1, padding: 15 }}>
      <View style={{ alignItems: 'center', paddingBottom: 15 }}>
        <Image source={{ uri: user.image }} style={{ height: 150, width: 150 }} />
      </View>
      <Text fontWeight='bold' style={{ fontSize: 20, paddingBottom:15 }}>{user.name}</Text>
      <Text style={{ fontSize: 15, paddingBottom: 10 }}>{user.role}</Text>
      <Text style={{ fontSize: 15, paddingBottom: 10 }}>{user.mail}</Text>
      <Text style={{ fontSize: 15, paddingBottom: 10 }}>{user.phone}</Text>
    </View>
  );
};

export default UserDetails;