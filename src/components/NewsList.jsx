import { FlatList, View, StyleSheet, Pressable, RefreshControl, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useContext, useCallback, useImperativeHandle, forwardRef } from 'react';
import useNews from '../hooks/useNews';
import NewsItem from './NewsItem';
import { AuthContext } from './AuthContext';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const NewsList = forwardRef(({ navigation }, ref) => {
  const { authState } = useContext(AuthContext);
  const news = useNews(authState.sharepointToken);

  const onRefresh = useCallback(() => {
    news.refresh();
  }, []);

  // Defining onRefresh to be forwarded with the ref. This is needed for the refresh button to work in the screen containing the list
  useImperativeHandle(ref, () => {
    return {
      onRefresh
    };
  });

  return (
    <>
      {news.list === undefined ?
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} refreshControl={
          <RefreshControl
            refreshing={news.isRefreshing}
            onRefresh={onRefresh} />
        }>
          <ActivityIndicator
            color='#276b80'
            size='large'
            animating={true} />
        </ScrollView> :
        <FlatList
          data={[...news.list, { id: -1, loadButton: true, visible: news.isMoreNews }]}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={news.isRefreshing}
              onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            if (item.loadButton) {
              if (item.visible) {
                return (
                  <Button key={item.id} title="Lataa lisää" onPress={() => news.loadMore()} />
                );
              } else {
                return null;
              }
            }
            return (
              <Pressable onPress={() => navigation.navigate('Uutinen', { news: item })}>
                <NewsItem news={item} key={item.id} />
              </Pressable>
            );
          }
          }
        />
      }</>
  );
});

NewsList.displayName = 'NewsList';
export default NewsList;