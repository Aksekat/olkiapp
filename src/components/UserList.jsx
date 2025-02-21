import { FlatList, View, StyleSheet, Pressable, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useContext, forwardRef, useState, useCallback, useImperativeHandle } from 'react';
import { AuthContext } from './AuthContext';
import useUsers from '../hooks/useUsers';
import UserItem from './UserItem';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserList = forwardRef(({ navigation }, ref) => {
  const { authState } = useContext(AuthContext);
  const users = useUsers(authState.accessToken);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    users.refresh().then(() => setRefreshing(false));
  }, []);

  // Defining onRefresh to be forwarded with the ref. This is needed for the refresh button to work in the screen containing the list
  useImperativeHandle(ref, () => {
    return {
      onRefresh
    };
  });

  return (
    <>
      {users.list === undefined ?
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }>
          <ActivityIndicator
            color='#276b80'
            size='large'
            animating={true} />
        </ScrollView> :
        <FlatList
          data={users.list}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('UserDetails', { user: item })}>
              <UserItem user={item} key={item.id} />
            </Pressable>
          )}
        />
      }</>
  );
});

UserList.displayName = 'UserList';
export default UserList;