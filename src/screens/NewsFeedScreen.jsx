import { View, Pressable } from 'react-native';
import { useRef, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NewsList from '../components/NewsList';

const NewsFeedScreen = ({ navigation }) => {
  // Reference for calling the update method of the list
  const listRef = useRef();

  // Add refresh button to header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => listRef.current.onRefresh()} title="Update" style={{ padding: 5, marginRight: 10 }}>
          <Ionicons name="refresh" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <NewsList ref={listRef} navigation={navigation} />
    </View>
  );
};

export default NewsFeedScreen;

