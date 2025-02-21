import { FlatList, View, StyleSheet, Pressable, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { useContext, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import useTrainingPrograms from '../hooks/useTrainingPrograms';
import EventItem from './EventItem';
import { AuthContext } from './AuthContext';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const TrainingProgramList = forwardRef(({ navigation }, ref) => {
  const { authState } = useContext(AuthContext);
  const trainingPrograms = useTrainingPrograms(authState.sharepointToken);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    trainingPrograms.refresh().then(() => setRefreshing(false));
  }, []);

  // Defining onRefresh to be forwarded with the ref. This is needed for the refresh button to work in the screen containing the list
  useImperativeHandle(ref, () => {
    return {
      onRefresh
    };
  });

  return (
    <>
      {trainingPrograms.list === undefined ?
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
          data={trainingPrograms.list}
          ItemSeparatorComponent={ItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('EventDetails', { event: item })}>
              <EventItem event={item} key={item.id} />
            </Pressable>
          )}
        />
      }</>
  );
});

TrainingProgramList.displayName = 'TrainingProgramList';

export default TrainingProgramList;