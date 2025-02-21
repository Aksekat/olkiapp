import { FlatList, View, StyleSheet, Pressable, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import { forwardRef, useContext, useState, useCallback, useImperativeHandle } from 'react';
import useNotifications from '../hooks/useNotifications';
import NewsItem from './NewsItem';
import { AuthContext } from './AuthContext';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const NotificationList = forwardRef(({ navigation }, ref) => {
  const { authState } = useContext(AuthContext);
  const notifications = useNotifications(authState.sharepointToken);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    notifications.refresh().then(() => setRefreshing(false));
  }, []);

  // Defining onRefresh to be forwarded with the ref. This is needed for the refresh button to work in the screen containing the list
  useImperativeHandle(ref, () => {
    return {
      onRefresh
    };
  });

  return (
    <>
      {notifications.list === undefined ?
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
          data={notifications.list}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('Uutinen', { news: item })}>
              <NewsItem news={item} key={item.id} />
            </Pressable>
          )}
        />
      }</>
  );
});

NotificationList.displayName = 'NotificationList';

export default NotificationList;