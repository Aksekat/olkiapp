import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const itemBodyStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  imageContainer: {
    flexGrow: 0,
    paddingTop: 5,
    paddingRight: 15
  },
  textContainer: {
    flexGrow: 0,
    marginBottom: -15,
    flexShrink: 1,
  }
});

const ItemBody = ({ user }) => {
  return (
    <View style={itemBodyStyles.container}>
      <View style={itemBodyStyles.imageContainer}>
        <Image style={itemBodyStyles.image} source={{ uri: user.image }} />
      </View>
      <View style={itemBodyStyles.textContainer}>
        <Text fontWeight='bold' fontSize='subheading'>{user.name}</Text>
        <Text color='textSecondary'>{user.role}</Text>
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
});

const UserItem = ({ user }) => {
  return (
    <View style={itemStyles.container}>
      <ItemBody user={user} />
    </View>
  );
};

export default UserItem;