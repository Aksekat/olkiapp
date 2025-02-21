import { FlatList, View, StyleSheet, Pressable, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import { forwardRef, useContext, useState, useCallback, useImperativeHandle } from 'react';
import useMaintenances from '../hooks/useMaintenances';
import NewsItem from './NewsItem';
import { AuthContext } from './AuthContext';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MaintenanceList = forwardRef(({ navigation }, ref) => {
  const { authState } = useContext(AuthContext);
  const maintenances = useMaintenances(authState.sharepointToken);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    maintenances.refresh().then(() => setRefreshing(false));
  }, []);

  // Defining onRefresh to be forwarded with the ref. This is needed for the refresh button to work in the screen containing the list
  useImperativeHandle(ref, () => {
    return {
      onRefresh
    };
  });

  return (
    <>
      {maintenances.list === undefined ?
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
          data={maintenances.list}
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

MaintenanceList.displayName = 'MaintenanceList';

export default MaintenanceList;