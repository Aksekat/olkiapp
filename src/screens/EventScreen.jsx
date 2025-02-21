import EventDetails from '../components/EventDetails';
import { ScrollView } from 'react-native';

const EventScreen = ({ route }) => {
  const event = route.params.event;
  return (
    <>
      <ScrollView>
        <EventDetails event={event} />
      </ScrollView>
    </>
  );
};

export default EventScreen;